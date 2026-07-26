import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

const rows: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "sparkles-outline",
    title: "What this beta is for",
    body: "Outdoor Nursery helps parents quickly compare Bay Area parks, playgrounds, and outdoor malls for low-stress outings with young kids."
  },
  {
    icon: "reader-outline",
    title: "Data status",
    body: "Place details are prototype data with official-source checks and parent-review fields. Treat details like fees, hours, and facilities as things to confirm before a real trip."
  },
  {
    icon: "chatbubble-ellipses-outline",
    title: "Feedback",
    body: "Quick feedback is anonymous in this MVP and helps decide which places need review. Text notes and accounts are intentionally not included yet."
  },
  {
    icon: "lock-closed-outline",
    title: "Privacy",
    body: "The MVP does not ask for child information, contacts, photos, accounts, or live location. Saved places stay on this phone, and quick feedback is anonymous."
  },
  {
    icon: "document-text-outline",
    title: "Privacy policy",
    body: "A plain-language privacy policy draft is ready for review before wider beta or TestFlight."
  }
];

export function ProfileScreen() {
  return (
    <SafeAreaView edges={["top"]} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <Ionicons color={colors.teal} name="leaf" size={30} />
          </View>
          <Text style={styles.title}>Outdoor Nursery</Text>
          <Text style={styles.subtitle}>
            A small parent-facing beta for finding baby and kid-friendly places to go.
          </Text>
          <View style={styles.statusPill}>
            <Ionicons color={colors.tealDark} name="flask-outline" size={15} />
            <Text style={styles.statusPillText}>MVP beta</Text>
          </View>
        </View>

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
  header: {
    backgroundColor: colors.card,
    borderRadius: 20,
    marginBottom: 16,
    padding: 18
  },
  headerIcon: {
    alignItems: "center",
    backgroundColor: colors.mintSoft,
    borderRadius: 18,
    height: 56,
    justifyContent: "center",
    marginBottom: 14,
    width: 56
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
    marginTop: 6
  },
  statusPill: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.mintSoft,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    marginTop: 14,
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  statusPillText: {
    color: colors.tealDark,
    fontSize: 12,
    fontWeight: "900"
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
