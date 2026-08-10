import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../theme";

type IconName = ComponentProps<typeof Ionicons>["name"];

const supportUrl = "https://yuqima17.github.io/outdoor-nursery/support.html";
const privacyUrl = "https://yuqima17.github.io/outdoor-nursery/privacy-policy.html";

const rows: Array<{ icon: IconName; title: string; body: string }> = [
  {
    icon: "sparkles-outline",
    title: "What Outdoor Nursery is for",
    body: "Outdoor Nursery helps parents quickly compare Bay Area parks, playgrounds, and outdoor malls for low-stress outings with young kids."
  },
  {
    icon: "reader-outline",
    title: "Place details",
    body: "Place details can change. Please confirm hours, fees, closures, and facilities with the official place source before a real trip."
  },
  {
    icon: "chatbubble-ellipses-outline",
    title: "Feedback",
    body: "Quick feedback is anonymous and helps identify which place details may need manual review."
  },
  {
    icon: "lock-closed-outline",
    title: "Privacy",
    body: "The app does not ask for child information, contacts, photos, accounts, payment information, or live location. Saved places stay on this phone."
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
            Baby and kid-friendly Bay Area outing ideas, with practical notes before you go.
          </Text>
          <View style={styles.statusPill}>
            <Ionicons color={colors.tealDark} name="map-outline" size={15} />
            <Text style={styles.statusPillText}>Bay Area guide</Text>
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

        <View style={styles.linkCard}>
          <Text style={styles.linkTitle}>Help and policies</Text>
          <Pressable
            accessibilityRole="link"
            onPress={() => Linking.openURL(supportUrl)}
            style={({ pressed }) => [styles.linkRow, pressed && styles.pressed]}
          >
            <View style={styles.linkIcon}>
              <Ionicons color={colors.teal} name="help-buoy-outline" size={22} />
            </View>
            <View style={styles.linkText}>
              <Text style={styles.linkLabel}>Support</Text>
              <Text style={styles.linkBody}>Report a problem or ask a question.</Text>
            </View>
            <Ionicons color={colors.muted} name="open-outline" size={19} />
          </Pressable>
          <Pressable
            accessibilityRole="link"
            onPress={() => Linking.openURL(privacyUrl)}
            style={({ pressed }) => [styles.linkRow, pressed && styles.pressed]}
          >
            <View style={styles.linkIcon}>
              <Ionicons color={colors.teal} name="document-text-outline" size={22} />
            </View>
            <View style={styles.linkText}>
              <Text style={styles.linkLabel}>Privacy policy</Text>
              <Text style={styles.linkBody}>Read how app data is handled.</Text>
            </View>
            <Ionicons color={colors.muted} name="open-outline" size={19} />
          </Pressable>
        </View>
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
  pressed: {
    opacity: 0.84
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
  },
  linkCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16
  },
  linkTitle: {
    color: colors.ink,
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8
  },
  linkRow: {
    alignItems: "center",
    borderTopColor: colors.border,
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 12,
    paddingVertical: 14
  },
  linkIcon: {
    alignItems: "center",
    backgroundColor: colors.mintSoft,
    borderRadius: 15,
    height: 44,
    justifyContent: "center",
    width: 44
  },
  linkText: {
    flex: 1
  },
  linkLabel: {
    color: colors.ink,
    fontSize: 15,
    fontWeight: "900"
  },
  linkBody: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 17,
    marginTop: 2
  }
});
