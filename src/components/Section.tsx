import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../theme";

interface SectionProps extends PropsWithChildren {
  title: string;
  caption?: string;
}

export function Section({ caption, children, title }: SectionProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {caption ? <Text style={styles.caption}>{caption}</Text> : null}
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 22
  },
  header: {
    marginBottom: 10
  },
  title: {
    color: colors.ink,
    fontSize: 22,
    fontWeight: "900"
  },
  caption: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4
  }
});
