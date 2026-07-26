import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Image,
  Linking,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { FilterChip } from "../components/FilterChip";
import { PlaceCard } from "../components/PlaceCard";
import { categoryDescriptions, categoryLabels } from "../data/places";
import { usePlaces } from "../state/PlacesContext";
import { useSavedPlaces } from "../state/SavedPlacesContext";
import { colors } from "../theme";
import type { RootStackParamList } from "../types/navigation";
import type { Category, Place } from "../types/place";
import { getDirectionsUrl } from "../utils/format";

type Navigation = NativeStackNavigationProp<RootStackParamList>;
type FilterKey = "recommended" | "free" | "stroller" | "restroom" | "shade";

const categories = Object.keys(categoryLabels) as Category[];

const filters: Array<{ key: FilterKey; label: string }> = [
  { key: "recommended", label: "Recommended" },
  { key: "free", label: "Free" },
  { key: "stroller", label: "Stroller-friendly" },
  { key: "restroom", label: "Restrooms" },
  { key: "shade", label: "Shade" }
];

const homeHeroImage = require("../../assets/home-hero.png");

export function GoScreen() {
  const navigation = useNavigation<Navigation>();
  const { dataSource, errorMessage, isLoading, places, refreshPlaces } = usePlaces();
  const { isSaved, toggleSaved } = useSavedPlaces();
  const [selectedCategory, setSelectedCategory] = useState<Category | "all">("all");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("recommended");
  const [searchText, setSearchText] = useState("");

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      const matchesCategory = selectedCategory === "all" || place.category === selectedCategory;
      const query = searchText.trim().toLowerCase();
      const matchesSearch =
        !query ||
        [place.name, place.area, place.city, place.summary, ...place.tags]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch && filterPlace(place, activeFilter);
    });
  }, [activeFilter, places, searchText, selectedCategory]);

  const openPlace = (place: Place) => {
    navigation.navigate("PlaceDetail", { placeId: place.id, title: place.name });
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            colors={[colors.teal]}
            onRefresh={() => {
              refreshPlaces().catch(() => undefined);
            }}
            refreshing={isLoading}
            tintColor={colors.teal}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.appName}>Outdoor Nursery</Text>
            <Text style={styles.location}>Bay Area · {places.length} places</Text>
          </View>
          <View style={styles.locationPill}>
            <Ionicons color={colors.teal} name="location" size={18} />
            <Text style={styles.locationPillText}>Bay Area</Text>
          </View>
        </View>
        {__DEV__ ? (
          <View style={styles.devStatus}>
            <Ionicons
              color={dataSource === "supabase" ? colors.tealDark : colors.coral}
              name={dataSource === "supabase" ? "cloud-done" : "phone-portrait"}
              size={15}
            />
            <Text style={styles.devStatusText}>
              Dev · {dataSource === "supabase" ? "Supabase" : "Local fallback"} ·{" "}
              {isLoading ? "Loading" : `${places.length} places`}
            </Text>
            {errorMessage ? (
              <Text numberOfLines={1} style={styles.devStatusError}>
                {errorMessage}
              </Text>
            ) : null}
          </View>
        ) : null}

        {isLoading ? (
          <StatusBanner
            body="Checking the latest place list. You can keep browsing while it refreshes."
            icon="sync"
            title="Refreshing places"
          />
        ) : null}

        {errorMessage && dataSource === "local" ? (
          <StatusBanner
            body="Live place data did not load, so the app is showing the saved MVP dataset. Pull down to retry."
            icon="cloud-offline"
            title="Using saved place data"
          />
        ) : null}

        <View style={styles.hero}>
          <Image
            accessibilityIgnoresInvertColors
            resizeMode="cover"
            source={homeHeroImage}
            style={styles.heroImage}
          />
          <View style={styles.heroTextBlock}>
            <Text style={styles.heroTitle}>Where should we go today?</Text>
            <Text style={styles.heroSubtitle}>
              Parent-friendly picks with stroller notes, restroom clues, and low-stress outing details.
            </Text>
          </View>
          <View style={styles.familyCues}>
            <FamilyCue icon="happy" label="Little-kid ready" />
            <FamilyCue icon="walk" label="Stroller notes" />
            <FamilyCue icon="heart" label="Baby care" />
            <FamilyCue icon="time" label="Short outings" />
          </View>
        </View>

        <View style={styles.searchBox}>
          <Ionicons color={colors.muted} name="search" size={22} />
          <TextInput
            autoCapitalize="none"
            onChangeText={setSearchText}
            placeholder="Search parks, playgrounds, malls"
            placeholderTextColor={colors.muted}
            style={styles.searchInput}
            value={searchText}
          />
        </View>

        <ScrollView
          contentContainerStyle={styles.categoryScroller}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <FilterChip
            active={selectedCategory === "all"}
            label="All"
            onPress={() => setSelectedCategory("all")}
          />
          {categories.map((category) => (
            <FilterChip
              active={selectedCategory === category}
              key={category}
              label={categoryLabels[category]}
              onPress={() => setSelectedCategory(category)}
            />
          ))}
        </ScrollView>

        {selectedCategory !== "all" ? (
          <View style={styles.categoryNote}>
            <Text style={styles.categoryNoteTitle}>{categoryLabels[selectedCategory]}</Text>
            <Text style={styles.categoryNoteText}>{categoryDescriptions[selectedCategory]}</Text>
          </View>
        ) : null}

        <ScrollView
          contentContainerStyle={styles.filterScroller}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {filters.map((filter) => (
            <FilterChip
              active={activeFilter === filter.key}
              key={filter.key}
              label={filter.label}
              onPress={() => setActiveFilter(filter.key)}
            />
          ))}
        </ScrollView>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Recommended Places</Text>
          <Text style={styles.count}>{filteredPlaces.length} available</Text>
        </View>

        {places.length === 0 && !isLoading ? (
          <View style={styles.emptyState}>
            <Ionicons color={colors.teal} name="map-outline" size={38} />
            <Text style={styles.emptyTitle}>No places loaded</Text>
            <Text style={styles.emptyText}>
              Pull down to refresh. If this keeps happening, check the data connection.
            </Text>
          </View>
        ) : null}

        {filteredPlaces.map((place) => (
          <PlaceCard
            isSaved={isSaved(place.id)}
            key={place.id}
            onDirections={() => Linking.openURL(getDirectionsUrl(place))}
            onOpen={() => openPlace(place)}
            onToggleSaved={() => toggleSaved(place.id)}
            place={place}
          />
        ))}

        {places.length > 0 && filteredPlaces.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons color={colors.teal} name="search-outline" size={38} />
            <Text style={styles.emptyTitle}>No matches yet</Text>
            <Text style={styles.emptyText}>Try removing one filter or searching another area.</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatusBanner({
  body,
  icon,
  title
}: {
  body: string;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
}) {
  return (
    <View style={styles.statusBanner}>
      <View style={styles.statusIcon}>
        <Ionicons color={colors.tealDark} name={icon} size={20} />
      </View>
      <View style={styles.statusCopy}>
        <Text style={styles.statusTitle}>{title}</Text>
        <Text style={styles.statusBody}>{body}</Text>
      </View>
    </View>
  );
}

function FamilyCue({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.familyCue}>
      <Ionicons color={colors.tealDark} name={icon} size={17} />
      <Text style={styles.familyCueText}>{label}</Text>
    </View>
  );
}

function filterPlace(place: Place, filter: FilterKey) {
  if (filter === "free") {
    return place.cost.type === "free";
  }

  if (filter === "stroller") {
    return place.amenities.stroller_friendly === "yes";
  }

  if (filter === "restroom") {
    return place.amenities.restroom === "yes" || place.amenities.restroom === "seasonal";
  }

  if (filter === "shade") {
    return place.amenities.shade === "good" || place.amenities.shade === "partial";
  }

  return true;
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: 18,
    paddingBottom: 28
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  appName: {
    color: colors.ink,
    fontSize: 26,
    fontWeight: "900"
  },
  location: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 3
  },
  locationPill: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 999,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9
  },
  locationPillText: {
    color: colors.tealDark,
    fontSize: 13,
    fontWeight: "900"
  },
  devStatus: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.mintSoft,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    marginTop: 12,
    maxWidth: "100%",
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  devStatusText: {
    color: colors.tealDark,
    fontSize: 12,
    fontWeight: "900"
  },
  devStatusError: {
    color: colors.coral,
    flexShrink: 1,
    fontSize: 11,
    fontWeight: "800",
    maxWidth: 170
  },
  statusBanner: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
    padding: 14
  },
  statusIcon: {
    alignItems: "center",
    backgroundColor: colors.mintSoft,
    borderRadius: 14,
    height: 42,
    justifyContent: "center",
    width: 42
  },
  statusCopy: {
    flex: 1
  },
  statusTitle: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900"
  },
  statusBody: {
    color: colors.text,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
    marginTop: 3
  },
  hero: {
    backgroundColor: colors.card,
    borderRadius: 22,
    marginTop: 18,
    padding: 20
  },
  heroImage: {
    borderRadius: 17,
    height: 172,
    marginBottom: 18,
    width: "100%"
  },
  heroTextBlock: {
    maxWidth: 320
  },
  heroTitle: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 34
  },
  heroSubtitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
    marginTop: 10
  },
  familyCues: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16
  },
  familyCue: {
    alignItems: "center",
    backgroundColor: colors.mintSoft,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  familyCueText: {
    color: colors.tealDark,
    fontSize: 12,
    fontWeight: "900"
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 20,
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
    minHeight: 58,
    paddingHorizontal: 16
  },
  searchInput: {
    color: colors.ink,
    flex: 1,
    fontSize: 16,
    fontWeight: "700"
  },
  categoryScroller: {
    gap: 10,
    paddingVertical: 16
  },
  filterScroller: {
    gap: 10,
    paddingBottom: 16
  },
  categoryNote: {
    backgroundColor: colors.mintSoft,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
    padding: 14
  },
  categoryNoteTitle: {
    color: colors.tealDark,
    fontSize: 16,
    fontWeight: "900"
  },
  categoryNoteText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 3
  },
  listHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12
  },
  sectionTitle: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900"
  },
  count: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "800"
  },
  emptyState: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 24
  },
  emptyTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900"
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6,
    textAlign: "center"
  }
});
