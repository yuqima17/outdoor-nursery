import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Tabs: undefined;
  PlaceDetail: {
    placeId: string;
    title: string;
  };
};

export type TabParamList = {
  Go: undefined;
  Saved: undefined;
  Profile: undefined;
};

export type PlaceDetailProps = NativeStackScreenProps<RootStackParamList, "PlaceDetail">;
