import { StyleSheet, View } from "react-native";

import { colors } from "../theme";
import type { Category } from "../types/place";

interface CategoryLogoTileProps {
  category: Category;
  size?: "card" | "detail";
}

export function CategoryLogoTile({ category, size = "card" }: CategoryLogoTileProps) {
  const tileSize = size === "detail" ? 84 : 72;
  const isDetail = size === "detail";

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
      <View style={[styles.sun, isDetail && styles.sunDetail]} />
      <View style={[styles.path, isDetail && styles.pathDetail]} />
      <CategoryMark category={category} isDetail={isDetail} />
    </View>
  );
}

function CategoryMark({ category, isDetail }: { category: Category; isDetail: boolean }) {
  if (category === "playground") {
    return <PlaygroundMark isDetail={isDetail} />;
  }

  if (category === "outdoor_mall") {
    return <MallMark isDetail={isDetail} />;
  }

  return <ParkMark isDetail={isDetail} />;
}

function ParkMark({ isDetail }: { isDetail: boolean }) {
  return (
    <View style={[styles.markBox, isDetail && styles.markBoxDetail]}>
      <View style={[styles.treeCanopyLarge, isDetail && styles.treeCanopyLargeDetail]} />
      <View style={[styles.treeCanopySmall, isDetail && styles.treeCanopySmallDetail]} />
      <View style={[styles.treeTrunk, isDetail && styles.treeTrunkDetail]} />
      <View style={[styles.grassBase, isDetail && styles.grassBaseDetail]} />
    </View>
  );
}

function PlaygroundMark({ isDetail }: { isDetail: boolean }) {
  return (
    <View style={[styles.markBox, isDetail && styles.markBoxDetail]}>
      <View style={[styles.playRoof, isDetail && styles.playRoofDetail]} />
      <View style={[styles.playPostLeft, isDetail && styles.playPostDetail]} />
      <View style={[styles.playPostRight, isDetail && styles.playPostDetail]} />
      <View style={[styles.playPlatform, isDetail && styles.playPlatformDetail]} />
      <View style={[styles.playSlide, isDetail && styles.playSlideDetail]} />
      <View style={[styles.playGround, isDetail && styles.playGroundDetail]} />
    </View>
  );
}

function MallMark({ isDetail }: { isDetail: boolean }) {
  return (
    <View style={[styles.markBox, isDetail && styles.markBoxDetail]}>
      <View style={[styles.mallAwning, isDetail && styles.mallAwningDetail]}>
        <View style={styles.mallAwningStripe} />
        <View style={[styles.mallAwningStripe, styles.mallAwningStripeAlt]} />
        <View style={styles.mallAwningStripe} />
      </View>
      <View style={[styles.mallBody, isDetail && styles.mallBodyDetail]}>
        <View style={[styles.mallWindow, isDetail && styles.mallWindowDetail]} />
        <View style={[styles.mallDoor, isDetail && styles.mallDoorDetail]} />
      </View>
    </View>
  );
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
    justifyContent: "center",
    overflow: "hidden"
  },
  parkTile: {
    backgroundColor: "#E7F4DF"
  },
  playgroundTile: {
    backgroundColor: "#FFF1CC"
  },
  outdoorMallTile: {
    backgroundColor: "#EAF7FA"
  },
  sun: {
    backgroundColor: "rgba(242, 140, 107, 0.32)",
    borderRadius: 999,
    height: 16,
    position: "absolute",
    right: 8,
    top: 8,
    width: 16
  },
  sunDetail: {
    height: 18,
    right: 10,
    top: 10,
    width: 18
  },
  path: {
    backgroundColor: "rgba(47, 111, 115, 0.12)",
    borderRadius: 999,
    bottom: -16,
    height: 32,
    position: "absolute",
    width: 86
  },
  pathDetail: {
    bottom: -18,
    height: 36,
    width: 98
  },
  markBox: {
    alignItems: "center",
    height: 48,
    justifyContent: "center",
    position: "relative",
    width: 48
  },
  markBoxDetail: {
    height: 58,
    width: 58
  },
  treeCanopyLarge: {
    backgroundColor: "#4FB989",
    borderRadius: 14,
    height: 28,
    left: 12,
    position: "absolute",
    top: 7,
    width: 28
  },
  treeCanopyLargeDetail: {
    borderRadius: 17,
    height: 34,
    left: 14,
    width: 34
  },
  treeCanopySmall: {
    backgroundColor: "#9CCE58",
    borderRadius: 11,
    height: 22,
    left: 3,
    position: "absolute",
    top: 17,
    width: 22
  },
  treeCanopySmallDetail: {
    borderRadius: 13,
    height: 26,
    left: 4,
    top: 21,
    width: 26
  },
  treeTrunk: {
    backgroundColor: colors.tealDark,
    borderRadius: 5,
    bottom: 9,
    height: 18,
    position: "absolute",
    width: 9
  },
  treeTrunkDetail: {
    bottom: 10,
    height: 22,
    width: 10
  },
  grassBase: {
    backgroundColor: "#7CBC62",
    borderRadius: 999,
    bottom: 4,
    height: 8,
    position: "absolute",
    width: 38
  },
  grassBaseDetail: {
    bottom: 5,
    height: 9,
    width: 44
  },
  playRoof: {
    backgroundColor: colors.coral,
    borderRadius: 7,
    height: 13,
    position: "absolute",
    top: 7,
    width: 31
  },
  playRoofDetail: {
    borderRadius: 8,
    height: 15,
    top: 8,
    width: 38
  },
  playPostLeft: {
    backgroundColor: colors.tealDark,
    borderRadius: 4,
    height: 25,
    left: 12,
    position: "absolute",
    top: 17,
    width: 7
  },
  playPostRight: {
    backgroundColor: colors.tealDark,
    borderRadius: 4,
    height: 25,
    position: "absolute",
    right: 14,
    top: 17,
    width: 7
  },
  playPostDetail: {
    height: 31,
    top: 20,
    width: 8
  },
  playPlatform: {
    backgroundColor: "#4FB989",
    borderRadius: 5,
    height: 8,
    left: 9,
    position: "absolute",
    top: 25,
    width: 26
  },
  playPlatformDetail: {
    height: 9,
    left: 11,
    top: 30,
    width: 31
  },
  playSlide: {
    backgroundColor: "#6EC7CF",
    borderRadius: 999,
    height: 8,
    position: "absolute",
    right: 3,
    top: 34,
    transform: [{ rotate: "-28deg" }],
    width: 28
  },
  playSlideDetail: {
    height: 9,
    right: 4,
    top: 40,
    width: 34
  },
  playGround: {
    backgroundColor: "#E2D991",
    borderRadius: 999,
    bottom: 4,
    height: 8,
    position: "absolute",
    width: 40
  },
  playGroundDetail: {
    bottom: 5,
    height: 9,
    width: 48
  },
  mallAwning: {
    borderRadius: 8,
    flexDirection: "row",
    height: 17,
    overflow: "hidden",
    position: "absolute",
    top: 8,
    width: 39
  },
  mallAwningDetail: {
    height: 20,
    top: 9,
    width: 47
  },
  mallAwningStripe: {
    backgroundColor: colors.teal,
    flex: 1
  },
  mallAwningStripeAlt: {
    backgroundColor: colors.coral
  },
  mallBody: {
    backgroundColor: colors.tealDark,
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    bottom: 8,
    flexDirection: "row",
    gap: 6,
    height: 25,
    justifyContent: "center",
    paddingTop: 7,
    position: "absolute",
    width: 34
  },
  mallBodyDetail: {
    bottom: 10,
    height: 30,
    paddingTop: 8,
    width: 41
  },
  mallWindow: {
    backgroundColor: "#D9F1EA",
    borderRadius: 3,
    height: 10,
    width: 9
  },
  mallWindowDetail: {
    height: 12,
    width: 10
  },
  mallDoor: {
    backgroundColor: "#FFF1CC",
    borderRadius: 3,
    height: 14,
    width: 9
  },
  mallDoorDetail: {
    height: 17,
    width: 11
  }
});
