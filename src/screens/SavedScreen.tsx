import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Linking, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PlaceCard } from "../components/PlaceCard";
import { usePlaces } from "../state/PlacesContext";
import { useSavedPlaces } from "../state/SavedPlacesContext";
import { colors } from "../theme";
import type { RootStackParamList } from "../types/navigation";
import { getDirectionsUrl } from "../utils/format";

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function SavedScreen() {
  const navigation = useNavigation<Navigation>();
  const { places } = usePlaces();
  const { isSaved, savedPlaceIds, toggleSaved } = useSavedPlaces();
  const savedPlaces = places.filter((place) => savedPlaceIds.includes(place.id));

  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Saved Places</Text>
        <Text style={styles.subtitle}>Keep a short list of places you want to try.</Text>

        {savedPlaces.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons color={colors.teal} name="heart-outline" size={42} />
            <Text style={styles.emptyTitle}>No saved places yet</Text>
            <Text style={styles.emptyText}>
              Save a place when you find one that fits your next outing.
            </Text>
          </View>
        ) : null}

        {savedPlaces.map((place) => (
          <PlaceCard
            isSaved={isSaved(place.id)}
            key={place.id}
            onDirections={() => Linking.openURL(getDirectionsUrl(place))}
            onOpen={() =>
              navigation.navigate("PlaceDetail", { placeId: place.id, title: place.name })
            }
            onToggleSaved={() => toggleSaved(place.id)}
            place={place}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
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
  title: {
    color: colors.ink,
    fontSize: 28,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 21,
    marginBottom: 18,
    marginTop: 6
  },
  emptyState: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 28
  },
  emptyTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 12
  },
  emptyText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: 6,
    textAlign: "center"
  }
});
