import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CategoryLogoTile } from "../components/CategoryLogoTile";
import { Section } from "../components/Section";
import { clearFeedbackVote, fetchFeedbackVoteCounts, submitFeedbackVote } from "../data/feedback";
import {
  feedbackPairs,
  normalizeFeedbackType,
  type FeedbackPair,
  type FeedbackOption
} from "../data/feedbackOptions";
import { usePlaces } from "../state/PlacesContext";
import { useSavedPlaces } from "../state/SavedPlacesContext";
import { colors } from "../theme";
import type { PlaceDetailProps } from "../types/navigation";
import type { Place } from "../types/place";
import {
  formatAgeFit,
  formatAdmission,
  formatBabyCare,
  formatCategory,
  formatDuration,
  formatParking,
  formatReservation,
  formatStrollerGuidance,
  formatValue,
  getDirectionsUrl
} from "../utils/format";

const FEEDBACK_STORAGE_KEY = "outdoor-nursery:place-feedback";
type FeedbackVoteCounts = Record<string, number>;

export function PlaceDetailScreen({ route }: PlaceDetailProps) {
  const { getPlace } = usePlaces();
  const place = getPlace(route.params.placeId);
  const { isSaved, toggleSaved } = useSavedPlaces();
  const [selectedFeedback, setSelectedFeedback] = useState<string[]>([]);
  const [feedbackVoteCounts, setFeedbackVoteCounts] = useState<FeedbackVoteCounts>({});

  useEffect(() => {
    AsyncStorage.getItem(`${FEEDBACK_STORAGE_KEY}:${route.params.placeId}`)
      .then((storedValue) => {
        if (storedValue) {
          setSelectedFeedback(
            normalizeStoredFeedbackSelection((JSON.parse(storedValue) as string[]).map(normalizeFeedbackType))
          );
        }
      })
      .catch(() => setSelectedFeedback([]));
  }, [route.params.placeId]);

  useEffect(() => {
    fetchFeedbackVoteCounts(route.params.placeId)
      .then((counts) => {
        setFeedbackVoteCounts(
          counts.reduce<FeedbackVoteCounts>((nextCounts, count) => {
            nextCounts[count.feedbackType] = count.voteCount;
            return nextCounts;
          }, {})
        );
      })
      .catch(() => setFeedbackVoteCounts({}));
  }, [route.params.placeId]);

  if (!place) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.missing}>
          <Text style={styles.missingTitle}>Place not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const saved = isSaved(place.id);

  return (
    <SafeAreaView edges={["bottom"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <CategoryLogoTile category={place.category} size="detail" />
          <Text style={styles.title}>{place.name}</Text>
          <Text style={styles.subtitle}>
            {formatCategory(place.category)} · {place.area}
          </Text>
          <View style={styles.tags}>
            {place.tags.slice(0, 5).map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{formatValue(tag)}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            onPress={() => Linking.openURL(getDirectionsUrl(place))}
            style={[styles.actionButton, styles.primaryAction]}
          >
            <Ionicons color={colors.card} name="navigate" size={18} />
            <Text style={styles.primaryActionText}>Directions</Text>
          </Pressable>
          <Pressable
            onPress={() => toggleSaved(place.id)}
            style={[styles.actionButton, styles.secondaryAction]}
          >
            <Ionicons color={colors.tealDark} name={saved ? "heart" : "heart-outline"} size={18} />
            <Text style={styles.secondaryActionText}>{saved ? "Saved" : "Save"}</Text>
          </Pressable>
        </View>

        <Section title="Basic Info">
          <View style={styles.infoGrid}>
            <Info label="Best for" value={place.age_guidance.display} />
            <Info label="Admission" value={formatAdmission(place)} />
            <Info label="Parking" value={formatParking(place)} />
            <Info label="Reserve" value={formatReservation(place)} />
            <Info label="Duration" value={formatDuration(place)} />
            <Info label="Weather" value={place.weather_fit.best_conditions.slice(0, 2).map(formatValue).join(", ")} />
          </View>
          <View style={styles.ageGuidanceCard}>
            <Text style={styles.ageGuidanceTitle}>Family fit notes</Text>
            <Text style={styles.ageGuidanceText}>{place.age_guidance.note}</Text>
            <Text style={styles.ageFitText}>Best with: {formatAgeFit(place.age_fit)}</Text>
          </View>
        </Section>

        <Section title="Before You Go">
          <ChecklistRow label="Admission" value={place.cost.note} />
          <ChecklistRow label="Parking fee" value={place.amenities.parking_fee.note} />
          <ChecklistRow label="Reservation" value={place.reservation.note} />
          <ChecklistRow
            label="Stroller access"
            value={formatStrollerGuidance(place.amenities.stroller_friendly)}
          />
          <ChecklistRow label="Restroom" value={formatValue(place.amenities.restroom)} />
          <ChecklistRow label="Baby care" value={formatBabyCare(place)} />
          <ChecklistRow label="Shade" value={formatValue(place.amenities.shade)} />
          <ChecklistRow label="Food nearby" value={formatValue(place.amenities.food_nearby)} />
        </Section>

        <Section title="Parent Notes" caption={place.parent_notes.best_time}>
          <Text style={styles.noteText}>{place.summary}</Text>
          <BulletList items={place.parent_notes.before_you_go} title="Before leaving" />
          <BulletList items={place.parent_notes.what_to_bring.map(formatBringItem)} title="Helpful to bring" />
          <BulletList items={place.parent_notes.safety_notes} title="Safety" />
          <BulletList items={place.parent_notes.avoid_notes} title="Avoid" />
        </Section>

        <Section title="Info Status">
          <View style={styles.sourceCard}>
            <Text style={styles.sourceText}>Last checked: {place.source.last_verified_at}</Text>
            <Text style={styles.sourceText}>
              Place details: {formatBaseDataStatus(place.data_quality.base_details)}
            </Text>
            <Text style={styles.sourceText}>
              Parent tips: {formatParentTipStatus(place.data_quality.caregiver_notes)}
            </Text>
          </View>
        </Section>

        <Section title="Quick Feedback" caption="Tap what matched your visit. Saved here and sent when online.">
          <View style={styles.feedbackPairs}>
            {feedbackPairs.map((pair) => (
              <FeedbackVotePair
                counts={feedbackVoteCounts}
                key={pair.topic}
                onSelect={(option, oppositeOption) =>
                  toggleFeedback(
                    place.id,
                    pair.topic,
                    option,
                    oppositeOption,
                    selectedFeedback,
                    setSelectedFeedback,
                    setFeedbackVoteCounts
                  )
                }
                pair={pair}
                selectedFeedback={selectedFeedback}
              />
            ))}
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function toggleFeedback(
  placeId: string,
  voteTopic: string,
  option: FeedbackOption,
  oppositeOption: FeedbackOption,
  selectedFeedback: string[],
  setSelectedFeedback: React.Dispatch<React.SetStateAction<string[]>>,
  setFeedbackVoteCounts: React.Dispatch<React.SetStateAction<FeedbackVoteCounts>>
) {
  const previousVoteType = selectedFeedback.find(
    (selectedOption) =>
      selectedOption === option.type || selectedOption === oppositeOption.type
  );
  const isDeselecting = previousVoteType === option.type;

  setSelectedFeedback((current) => {
    const withoutPair = current.filter(
      (selectedOption) =>
        selectedOption !== option.type && selectedOption !== oppositeOption.type
    );
    const next = isDeselecting ? withoutPair : [...withoutPair, option.type];

    AsyncStorage.setItem(`${FEEDBACK_STORAGE_KEY}:${placeId}`, JSON.stringify(next)).catch(
      () => undefined
    );

    return next;
  });

  if (isDeselecting) {
    setFeedbackVoteCounts((current) => ({
      ...current,
      [option.type]: Math.max((current[option.type] ?? 0) - 1, 0)
    }));

    clearFeedbackVote({
      placeId,
      voteTopic
    }).catch(() => undefined);

    return;
  }

  setFeedbackVoteCounts((current) => ({
    ...current,
    [option.type]: (current[option.type] ?? 0) + 1,
    ...(previousVoteType
      ? { [previousVoteType]: Math.max((current[previousVoteType] ?? 0) - 1, 0) }
      : {})
  }));

  submitFeedbackVote({
    feedbackLabel: option.label,
    feedbackType: option.type,
    placeId,
    voteTopic
  }).catch(() => undefined);
}

function normalizeStoredFeedbackSelection(feedbackTypes: string[]) {
  const pairedTypes = new Set<string>(
    feedbackPairs.flatMap((pair) => [pair.positive.type, pair.negative.type])
  );
  const latestByTopic = new Map<string, string>();
  const unpairedTypes = feedbackTypes.filter((feedbackType) => !pairedTypes.has(feedbackType));

  feedbackTypes.forEach((feedbackType) => {
    const pair = feedbackPairs.find(
      (feedbackPair) =>
        feedbackPair.positive.type === feedbackType || feedbackPair.negative.type === feedbackType
    );

    if (pair) {
      latestByTopic.set(pair.topic, feedbackType);
    }
  });

  return [...unpairedTypes, ...latestByTopic.values()];
}

function FeedbackVotePair({
  counts,
  onSelect,
  pair,
  selectedFeedback
}: {
  counts: FeedbackVoteCounts;
  onSelect: (option: FeedbackOption, oppositeOption: FeedbackOption) => void;
  pair: FeedbackPair;
  selectedFeedback: string[];
}) {
  const positiveSelected = selectedFeedback.includes(pair.positive.type);
  const negativeSelected = selectedFeedback.includes(pair.negative.type);
  const positiveCount = counts[pair.positive.type] ?? 0;
  const negativeCount = counts[pair.negative.type] ?? 0;
  const totalCount = positiveCount + negativeCount;

  return (
    <View style={styles.feedbackPair}>
      <Text style={styles.feedbackTopic}>{pair.topic}</Text>
      <View style={styles.feedbackVoteTrack}>
        <Pressable
          accessibilityRole="button"
          onPress={() => onSelect(pair.positive, pair.negative)}
          style={[
            styles.feedbackVoteButton,
            styles.feedbackVoteLeft,
            positiveSelected && styles.feedbackVotePositiveActive
          ]}
        >
          <Text
            style={[
              styles.feedbackVoteText,
              positiveSelected && styles.feedbackVoteTextActive
            ]}
          >
            {pair.positive.label}
          </Text>
          <Text
            style={[
              styles.feedbackVoteCount,
              positiveSelected && styles.feedbackVoteCountActive
            ]}
          >
            {positiveCount}
          </Text>
        </Pressable>
        <View style={styles.feedbackDivider} />
        <Pressable
          accessibilityRole="button"
          onPress={() => onSelect(pair.negative, pair.positive)}
          style={[
            styles.feedbackVoteButton,
            styles.feedbackVoteRight,
            negativeSelected && styles.feedbackVoteNegativeActive
          ]}
        >
          <Text
            style={[
              styles.feedbackVoteText,
              negativeSelected && styles.feedbackVoteTextActive
            ]}
          >
            {pair.negative.label}
          </Text>
          <Text
            style={[
              styles.feedbackVoteCount,
              negativeSelected && styles.feedbackVoteCountActive
            ]}
          >
            {negativeCount}
          </Text>
        </Pressable>
      </View>
      <View style={styles.feedbackMeter}>
        <View
          style={[
            styles.feedbackMeterPositive,
            { flex: totalCount ? positiveCount : 1 }
          ]}
        />
        <View
          style={[
            styles.feedbackMeterNegative,
            { flex: totalCount ? negativeCount : 1 }
          ]}
        />
      </View>
    </View>
  );
}

function formatBringItem(item: string) {
  if (item === "Stroller") {
    return "Stroller if helpful";
  }

  if (item === "Stroller with good wheels") {
    return "All-terrain stroller if helpful";
  }

  return item;
}

function formatBaseDataStatus(value: string) {
  if (value === "official_source") {
    return "Official source checked";
  }

  return formatValue(value);
}

function formatParentTipStatus(value: string) {
  if (value === "needs_parent_verification") {
    return "Needs more parent visits";
  }

  return formatValue(value);
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

function ChecklistRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.checkRow}>
      <Text style={styles.checkLabel}>{label}</Text>
      <Text style={styles.checkValue}>{value}</Text>
    </View>
  );
}

function BulletList({ items, title }: { items: string[]; title: string }) {
  return (
    <View style={styles.bulletBlock}>
      <Text style={styles.bulletTitle}>{title}</Text>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: 18,
    paddingBottom: 34
  },
  hero: {
    alignItems: "flex-start",
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 20
  },
  title: {
    color: colors.ink,
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 34,
    marginTop: 16
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 6
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 14
  },
  tag: {
    backgroundColor: colors.mint,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  tagText: {
    color: colors.tealDark,
    fontSize: 12,
    fontWeight: "800"
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 14
  },
  actionButton: {
    alignItems: "center",
    borderRadius: 16,
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 54
  },
  primaryAction: {
    backgroundColor: colors.teal
  },
  secondaryAction: {
    backgroundColor: colors.cream
  },
  primaryActionText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: "900"
  },
  secondaryActionText: {
    color: colors.tealDark,
    fontSize: 16,
    fontWeight: "900"
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  infoItem: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    width: "47%"
  },
  infoLabel: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  },
  infoValue: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 5
  },
  ageGuidanceCard: {
    backgroundColor: colors.mintSoft,
    borderColor: colors.border,
    borderRadius: 16,
    borderWidth: 1,
    marginTop: 12,
    padding: 14
  },
  ageGuidanceTitle: {
    color: colors.tealDark,
    fontSize: 15,
    fontWeight: "900"
  },
  ageGuidanceText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20,
    marginTop: 6
  },
  ageFitText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    marginTop: 8
  },
  checkRow: {
    alignItems: "flex-start",
    backgroundColor: colors.card,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 14,
    minHeight: 54,
    paddingHorizontal: 16,
    paddingVertical: 12
  },
  checkLabel: {
    color: colors.tealDark,
    fontSize: 16,
    fontWeight: "900",
    width: 112
  },
  checkValue: {
    color: colors.ink,
    flex: 1,
    fontSize: 16,
    fontWeight: "800",
    lineHeight: 22
  },
  noteText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    lineHeight: 22,
    marginBottom: 12
  },
  bulletBlock: {
    backgroundColor: colors.card,
    borderRadius: 16,
    marginTop: 10,
    padding: 14
  },
  bulletTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900",
    marginBottom: 8
  },
  bulletRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 7
  },
  bullet: {
    color: colors.teal,
    fontSize: 16,
    fontWeight: "900"
  },
  bulletText: {
    color: colors.text,
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 20
  },
  sourceCard: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14
  },
  sourceText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
    lineHeight: 22
  },
  feedbackPairs: {
    gap: 14
  },
  feedbackPair: {
    gap: 8
  },
  feedbackTopic: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "900",
    textTransform: "uppercase"
  },
  feedbackVoteTrack: {
    alignItems: "stretch",
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    minHeight: 48,
    overflow: "hidden"
  },
  feedbackVoteButton: {
    alignItems: "center",
    flex: 1,
    gap: 3,
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  feedbackVoteLeft: {
    borderBottomLeftRadius: 13,
    borderTopLeftRadius: 13
  },
  feedbackVoteRight: {
    borderBottomRightRadius: 13,
    borderTopRightRadius: 13
  },
  feedbackDivider: {
    backgroundColor: colors.border,
    width: 1
  },
  feedbackVotePositiveActive: {
    backgroundColor: colors.teal
  },
  feedbackVoteNegativeActive: {
    backgroundColor: colors.coral
  },
  feedbackVoteText: {
    color: colors.tealDark,
    fontSize: 13,
    fontWeight: "900",
    lineHeight: 17,
    textAlign: "center"
  },
  feedbackVoteTextActive: {
    color: colors.card
  },
  feedbackVoteCount: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "900"
  },
  feedbackVoteCountActive: {
    color: colors.card
  },
  feedbackMeter: {
    backgroundColor: colors.mintSoft,
    borderRadius: 999,
    flexDirection: "row",
    height: 6,
    overflow: "hidden"
  },
  feedbackMeterPositive: {
    backgroundColor: colors.teal
  },
  feedbackMeterNegative: {
    backgroundColor: colors.coral
  },
  missing: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  missingTitle: {
    color: colors.ink,
    fontSize: 20,
    fontWeight: "900"
  }
});
