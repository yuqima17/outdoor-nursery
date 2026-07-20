import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "../theme";

interface FilterChipProps {
  label: string;
  active?: boolean;
  onPress: () => void;
}

export function FilterChip({ active = false, label, onPress }: FilterChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        active && styles.activeChip,
        pressed && styles.pressed
      ]}
    >
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: colors.card,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 9
  },
  activeChip: {
    backgroundColor: colors.teal,
    borderColor: colors.teal
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800"
  },
  activeLabel: {
    color: colors.card
  },
  pressed: {
    opacity: 0.8
  }
});
