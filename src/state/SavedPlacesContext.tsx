import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "outdoor-nursery:saved-place-ids";

interface SavedPlacesContextValue {
  isLoaded: boolean;
  savedPlaceIds: string[];
  isSaved: (placeId: string) => boolean;
  toggleSaved: (placeId: string) => void;
}

const SavedPlacesContext = createContext<SavedPlacesContextValue | null>(null);

export function SavedPlacesProvider({ children }: PropsWithChildren) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [savedPlaceIds, setSavedPlaceIds] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((storedValue) => {
        if (storedValue) {
          setSavedPlaceIds(JSON.parse(storedValue) as string[]);
        }
      })
      .catch(() => {
        setSavedPlaceIds([]);
      })
      .finally(() => {
        setIsLoaded(true);
      });
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(savedPlaceIds)).catch(() => undefined);
  }, [isLoaded, savedPlaceIds]);

  const value = useMemo<SavedPlacesContextValue>(
    () => ({
      isLoaded,
      savedPlaceIds,
      isSaved: (placeId) => savedPlaceIds.includes(placeId),
      toggleSaved: (placeId) => {
        setSavedPlaceIds((current) =>
          current.includes(placeId)
            ? current.filter((savedId) => savedId !== placeId)
            : [...current, placeId]
        );
      }
    }),
    [isLoaded, savedPlaceIds]
  );

  return <SavedPlacesContext.Provider value={value}>{children}</SavedPlacesContext.Provider>;
}

export function useSavedPlaces() {
  const context = useContext(SavedPlacesContext);

  if (!context) {
    throw new Error("useSavedPlaces must be used inside SavedPlacesProvider");
  }

  return context;
}
