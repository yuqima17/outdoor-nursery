import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors } from "../theme";
import type { Place } from "../types/place";
import {
  formatAdmission,
  formatBabyCare,
  formatCategory,
  formatParking,
  formatStrollerGuidance,
  formatValue
} from "../utils/format";

interface PlaceCardProps {
  place: Place;
  isSaved?: boolean;
  onOpen: () => void;
  onDirections: () => void;
  onToggleSaved: () => void;
}

export function PlaceCard({
  isSaved = false,
  onDirections,
  onOpen,
  onToggleSaved,
  place
}: PlaceCardProps) {
  const tags = place.tags.slice(0, 4);

  return (
    <Pressable onPress={onOpen} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.header}>
        <View style={[styles.imageFrame, imageFrameStyleForCategory(place.category)]}>
          <View style={styles.imageSun} />
          <View style={styles.imageGround} />
          <View style={styles.logoMark}>
            <Ionicons color={colors.tealDark} name={iconForCategory(place.category)} size={31} />
          </View>
        </View>
        <View style={styles.titleBlock}>
          <Text numberOfLines={2} style={styles.title}>
            {place.name}
          </Text>
          <Text style={styles.subtitle}>
            {formatCategory(place.category)} · {place.area}
          </Text>
        </View>
        <Pressable
          accessibilityLabel={isSaved ? "Remove from saved places" : "Save place"}
          hitSlop={10}
          onPress={onToggleSaved}
          style={styles.saveButton}
        >
          <Ionicons
            color={isSaved ? colors.coral : colors.tealDark}
            name={isSaved ? "heart" : "heart-outline"}
            size={21}
          />
        </Pressable>
      </View>

      <View style={styles.tags}>
        {tags.map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{formatValue(tag)}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoGrid}>
        <Info label="Best for" value={place.age_guidance.display} />
        <Info label="Admission" value={formatAdmission(place)} />
        <Info label="Parking" value={formatParking(place)} />
        <Info label="Stroller" value={formatStrollerGuidance(place.amenities.stroller_friendly)} />
        <Info label="Restroom" value={formatValue(place.amenities.restroom)} />
        <Info label="Baby care" value={formatBabyCare(place)} />
      </View>

      <Text numberOfLines={2} style={styles.weather}>
        {place.weather_fit.note}
      </Text>

      <View style={styles.actions}>
        <Pressable onPress={onDirections} style={[styles.actionButton, styles.secondaryAction]}>
          <Ionicons color={colors.tealDark} name="navigate" size={18} />
          <Text style={styles.secondaryActionText}>Go</Text>
        </Pressable>
        <Pressable onPress={onOpen} style={[styles.actionButton, styles.primaryAction]}>
          <Text style={styles.primaryActionText}>Details</Text>
          <Ionicons color={colors.card} name="chevron-forward" size={18} />
        </Pressable>
      </View>
    </Pressable>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text numberOfLines={2} style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

function iconForCategory(category: Place["category"]) {
  if (category === "playground") {
    return "happy";
  }

  if (category === "outdoor_mall") {
    return "storefront";
  }

  return "leaf";
}

function imageFrameStyleForCategory(category: Place["category"]) {
  if (category === "playground") {
    return styles.playgroundImageFrame;
  }

  if (category === "outdoor_mall") {
    return styles.outdoorMallImageFrame;
  }

  return styles.parkImageFrame;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOpacity: 0.14,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 7 },
    elevation: 2
  },
  pressed: {
    opacity: 0.88
  },
  header: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start"
  },
  imageFrame: {
    width: 72,
    height: 72,
    borderRadius: 13,
    alignItems: "center",
    backgroundColor: colors.mintSoft,
    borderColor: colors.border,
    borderWidth: 1,
    justifyContent: "center",
    overflow: "hidden"
  },
  parkImageFrame: {
    backgroundColor: "#E7F4DF"
  },
  playgroundImageFrame: {
    backgroundColor: "#FFF1CC"
  },
  outdoorMallImageFrame: {
    backgroundColor: "#EAF7FA"
  },
  imageSun: {
    backgroundColor: "rgba(242, 140, 107, 0.32)",
    borderRadius: 999,
    height: 18,
    position: "absolute",
    right: 10,
    top: 9,
    width: 18
  },
  imageGround: {
    backgroundColor: "rgba(47, 111, 115, 0.14)",
    borderRadius: 999,
    bottom: -18,
    height: 34,
    position: "absolute",
    width: 88
  },
  logoMark: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    borderRadius: 18,
    height: 48,
    justifyContent: "center",
    width: 48
  },
  titleBlock: {
    flex: 1
  },
  title: {
    color: colors.ink,
    fontSize: 21,
    fontWeight: "900",
    lineHeight: 25
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 4
  },
  saveButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.panel,
    borderColor: colors.border,
    borderWidth: 1
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14
  },
  tag: {
    backgroundColor: colors.mintSoft,
    borderColor: colors.border,
    borderRadius: 9,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  tagText: {
    color: colors.tealDark,
    fontSize: 12,
    fontWeight: "800"
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 14
  },
  infoItem: {
    width: "47%",
    backgroundColor: colors.panel,
    borderRadius: 12,
    minHeight: 70,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  infoLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  },
  infoValue: {
    color: colors.ink,
    fontSize: 14,
    fontWeight: "900",
    lineHeight: 18,
    marginTop: 4
  },
  weather: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18,
    marginTop: 12
  },
  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14
  },
  actionButton: {
    flex: 1,
    borderRadius: 12,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  },
  primaryAction: {
    backgroundColor: colors.teal
  },
  secondaryAction: {
    backgroundColor: colors.cream
  },
  primaryActionText: {
    color: colors.card,
    fontSize: 15,
    fontWeight: "900"
  },
  secondaryActionText: {
    color: colors.tealDark,
    fontSize: 15,
    fontWeight: "900"
  }
});
