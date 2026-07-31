import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AppErrorBoundary } from "./src/components/AppErrorBoundary";
import { PlaceDetailScreen } from "./src/screens/PlaceDetailScreen";
import { ProfileScreen } from "./src/screens/ProfileScreen";
import { SavedScreen } from "./src/screens/SavedScreen";
import { GoScreen } from "./src/screens/GoScreen";
import { PlacesProvider } from "./src/state/PlacesContext";
import { SavedPlacesProvider } from "./src/state/SavedPlacesContext";
import { colors } from "./src/theme";
import type { RootStackParamList, TabParamList } from "./src/types/navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.teal,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          borderTopColor: colors.border,
          height: 82,
          paddingBottom: 22,
          paddingTop: 10
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700"
        },
        tabBarIcon: ({ color, size }) => {
          const iconName =
            route.name === "Go" ? "home" : route.name === "Saved" ? "heart" : "person";

          return <Ionicons color={color} name={iconName} size={size} />;
        }
      })}
    >
      <Tabs.Screen component={GoScreen} name="Go" />
      <Tabs.Screen component={SavedScreen} name="Saved" />
      <Tabs.Screen component={ProfileScreen} name="Profile" />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <AppErrorBoundary>
      <SafeAreaProvider>
        <PlacesProvider>
          <SavedPlacesProvider>
            <NavigationContainer>
              <StatusBar style="dark" />
              <Stack.Navigator
                screenOptions={{
                  contentStyle: { backgroundColor: colors.background },
                  headerBackTitle: "Back",
                  headerShadowVisible: false,
                  headerStyle: { backgroundColor: colors.background },
                  headerTintColor: colors.ink,
                  headerTitleStyle: { fontWeight: "800" }
                }}
              >
                <Stack.Screen component={MainTabs} name="Tabs" options={{ headerShown: false }} />
                <Stack.Screen
                  component={PlaceDetailScreen}
                  name="PlaceDetail"
                  options={({ route }) => ({ title: route.params.title })}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </SavedPlacesProvider>
        </PlacesProvider>
      </SafeAreaProvider>
    </AppErrorBoundary>
  );
}
