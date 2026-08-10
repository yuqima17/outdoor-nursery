import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Image,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
  { key: "recommended", label: "Good for today" },
  { key: "free", label: "Free" },
  { key: "stroller", label: "Easy stroller" },
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
            <Text style={styles.location}>Bay Area · {places.length} baby-friendly ideas</Text>
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
            body="Live place data did not load, so the app is showing saved place data. Pull down to retry."
            icon="cloud-offline"
            title="Using saved place data"
          />
        ) : null}

        <View style={styles.plannerCard}>
          <Image
            accessibilityIgnoresInvertColors
            resizeMode="cover"
            source={homeHeroImage}
            style={styles.plannerImage}
          />
          <View style={styles.plannerBody}>
            <View style={styles.plannerCopy}>
              <View style={styles.plannerMetaRow}>
                <View style={styles.eyebrowRow}>
                  <Ionicons color={colors.coral} name="sunny" size={15} />
                  <Text style={styles.eyebrow}>Today's outing planner</Text>
                </View>
                <View style={styles.plannerBadge}>
                  <Text style={styles.plannerBadgeText}>Parent notes first</Text>
                </View>
              </View>
              <Text style={styles.heroTitle}>Where should we go today?</Text>
              <Text style={styles.heroSubtitle}>
                Practical Bay Area picks for babies, toddlers, and low-stress family walks.
              </Text>
            </View>
          </View>
          <View style={styles.familyCues}>
            <FamilyCue icon="happy" label="Baby-friendly" />
            <FamilyCue icon="walk" label="Easy walking" />
            <FamilyCue icon="water" label="Break spots" />
          </View>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons color={colors.muted} name="search" size={22} />
            <TextInput
              autoCapitalize="none"
              onChangeText={setSearchText}
              placeholder="Search place, area, feature"
              placeholderTextColor={colors.muted}
              style={styles.searchInput}
              value={searchText}
            />
          </View>
          <Pressable
            accessibilityLabel="Show good places for today"
            onPress={() => setActiveFilter("recommended")}
            style={({ pressed }) => [styles.searchAction, pressed && styles.pressed]}
          >
            <Ionicons color={colors.card} name="sparkles" size={21} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.categoryScroller}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <CategoryPill
            active={selectedCategory === "all"}
            icon="compass"
            label="All"
            onPress={() => setSelectedCategory("all")}
          />
          {categories.map((category) => (
            <CategoryPill
              active={selectedCategory === category}
              icon={iconForCategory(category)}
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

        <View style={styles.shortcutGrid}>
          {filters.map((filter) => (
            <ShortcutButton
              active={activeFilter === filter.key}
              key={filter.key}
              label={filter.label}
              onPress={() => setActiveFilter(filter.key)}
            />
          ))}
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>{titleForFilter(activeFilter)}</Text>
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

function CategoryPill({
  active,
  icon,
  label,
  onPress
}: {
  active: boolean;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.categoryPill,
        active && styles.categoryPillActive,
        pressed && styles.pressed
      ]}
    >
      <View style={[styles.categoryIcon, active && styles.categoryIconActive]}>
        <Ionicons color={active ? colors.card : colors.tealDark} name={icon} size={18} />
      </View>
      <Text style={[styles.categoryPillText, active && styles.categoryPillTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

function ShortcutButton({
  active,
  label,
  onPress
}: {
  active: boolean;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.shortcutButton,
        active && styles.shortcutButtonActive,
        pressed && styles.pressed
      ]}
    >
      <Text style={[styles.shortcutText, active && styles.shortcutTextActive]}>{label}</Text>
    </Pressable>
  );
}

function iconForCategory(category: Category) {
  if (category === "playground") {
    return "happy";
  }

  if (category === "outdoor_mall") {
    return "storefront";
  }

  return "leaf";
}

function titleForFilter(filter: FilterKey) {
  if (filter === "free") {
    return "Free Outings";
  }

  if (filter === "stroller") {
    return "Easy Stroller Walks";
  }

  if (filter === "restroom") {
    return "Restroom-Friendly";
  }

  if (filter === "shade") {
    return "Shade Breaks";
  }

  return "Good For Today";
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
  pressed: {
    opacity: 0.84
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
    color: colors.coral,
    fontSize: 14,
    fontWeight: "900",
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
    backgroundColor: colors.card,
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
  plannerCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 18,
    overflow: "hidden",
    paddingBottom: 16
  },
  plannerImage: {
    height: 124,
    width: "100%"
  },
  plannerBody: {
    paddingHorizontal: 16,
    paddingTop: 14
  },
  plannerCopy: {
    flex: 1
  },
  plannerMetaRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
    marginBottom: 8
  },
  eyebrowRow: {
    alignItems: "center",
    flexDirection: "row",
    flexShrink: 1,
    gap: 6
  },
  eyebrow: {
    color: colors.coral,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  heroTitle: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900",
    lineHeight: 32
  },
  heroSubtitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: 8
  },
  plannerBadge: {
    backgroundColor: colors.cream,
    borderRadius: 999,
    flexShrink: 0,
    paddingHorizontal: 9,
    paddingVertical: 6
  },
  plannerBadgeText: {
    color: colors.tealDark,
    fontSize: 10,
    fontWeight: "900",
    lineHeight: 13
  },
  familyCues: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14,
    paddingHorizontal: 16
  },
  familyCue: {
    alignItems: "center",
    backgroundColor: colors.panel,
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
  searchRow: {
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    marginTop: 16
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flex: 1,
    flexDirection: "row",
    gap: 10,
    minHeight: 58,
    paddingHorizontal: 16
  },
  searchAction: {
    alignItems: "center",
    backgroundColor: colors.coral,
    borderRadius: 14,
    height: 58,
    justifyContent: "center",
    shadowColor: colors.coral,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    width: 58
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
  categoryPill: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  categoryPillActive: {
    backgroundColor: colors.teal,
    borderColor: colors.teal
  },
  categoryIcon: {
    alignItems: "center",
    backgroundColor: colors.mintSoft,
    borderRadius: 10,
    height: 30,
    justifyContent: "center",
    width: 30
  },
  categoryIconActive: {
    backgroundColor: "rgba(255,255,255,0.18)"
  },
  categoryPillText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900"
  },
  categoryPillTextActive: {
    color: colors.card
  },
  categoryNote: {
    backgroundColor: colors.panel,
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
  shortcutGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 18
  },
  shortcutButton: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 12,
    borderWidth: 1,
    minHeight: 42,
    paddingHorizontal: 13,
    paddingVertical: 11
  },
  shortcutButtonActive: {
    backgroundColor: colors.cream,
    borderColor: "#F3D992"
  },
  shortcutText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900"
  },
  shortcutTextActive: {
    color: colors.ink
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
