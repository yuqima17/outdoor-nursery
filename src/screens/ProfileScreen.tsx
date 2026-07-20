import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

const rows: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "happy-outline",
    title: "Child age preferences",
    body: "Coming later: baby, toddler, and preschool filters."
  },
  {
    icon: "options-outline",
    title: "Favorite filters",
    body: "Coming later: stroller, restrooms, shade, parking, and food."
  },
  {
    icon: "chatbubble-ellipses-outline",
    title: "Feedback history",
    body: "Coming later: see the notes you submitted for places."
  }
];

export function ProfileScreen() {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Placeholder settings for the first prototype.</Text>

        {rows.map((row) => (
          <View key={row.title} style={styles.row}>
            <View style={styles.icon}>
              <Ionicons color={colors.teal} name={row.icon} size={24} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{row.title}</Text>
              <Text style={styles.rowBody}>{row.body}</Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: 18
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
  row: {
    alignItems: "center",
    backgroundColor: colors.card,
    borderRadius: 18,
    flexDirection: "row",
    gap: 14,
    marginBottom: 12,
    padding: 16
  },
  icon: {
    alignItems: "center",
    backgroundColor: colors.mintSoft,
    borderRadius: 18,
    height: 54,
    justifyContent: "center",
    width: 54
  },
  rowText: {
    flex: 1
  },
  rowTitle: {
    color: colors.ink,
    fontSize: 16,
    fontWeight: "900"
  },
  rowBody: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 4
  }
});
