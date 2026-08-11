import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";
import { StyleSheet, View } from "react-native";

import { colors } from "../theme";
import type { Category } from "../types/place";

type IconName = ComponentProps<typeof Ionicons>["name"];

interface CategoryLogoTileProps {
  category: Category;
  size?: "card" | "detail";
}

export function CategoryLogoTile({ category, size = "card" }: CategoryLogoTileProps) {
  const tileSize = size === "detail" ? 84 : 72;
  const iconSize = size === "detail" ? 44 : 34;

  return (
    <View
      style={[
        styles.tile,
        tileStyleForCategory(category),
        {
          borderRadius: size === "detail" ? 20 : 13,
          height: tileSize,
          width: tileSize
        }
      ]}
    >
      <Ionicons color={colors.tealDark} name={iconForCategory(category)} size={iconSize} />
    </View>
  );
}

function iconForCategory(category: Category): IconName {
  if (category === "playground") {
    return "happy";
  }

  if (category === "outdoor_mall") {
    return "storefront";
  }

  return "leaf";
}

function tileStyleForCategory(category: Category) {
  if (category === "playground") {
    return styles.playgroundTile;
  }

  if (category === "outdoor_mall") {
    return styles.outdoorMallTile;
  }

  return styles.parkTile;
}

const styles = StyleSheet.create({
  tile: {
    alignItems: "center",
    borderColor: colors.border,
    borderWidth: 1,
    justifyContent: "center"
  },
  parkTile: {
    backgroundColor: "#E7F4DF"
  },
  playgroundTile: {
    backgroundColor: "#FFF1CC"
  },
  outdoorMallTile: {
    backgroundColor: "#EAF7FA"
  }
});
