import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { getPlaceById, loadPlaces, localPlaces, type PlacesDataSource } from "../data/places";
import type { Place } from "../types/place";

interface PlacesContextValue {
  dataSource: PlacesDataSource;
  errorMessage?: string;
  isLoading: boolean;
  places: Place[];
  refreshPlaces: () => Promise<void>;
  getPlace: (placeId: string) => Place | undefined;
}

const PlacesContext = createContext<PlacesContextValue | null>(null);

export function PlacesProvider({ children }: PropsWithChildren) {
  const [places, setPlaces] = useState<Place[]>(localPlaces);
  const [dataSource, setDataSource] = useState<PlacesDataSource>("local");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const refreshPlaces = useCallback(async () => {
    setIsLoading(true);

    try {
      const result = await loadPlaces();

      setPlaces(result.places);
      setDataSource(result.source);
      setErrorMessage(result.errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshPlaces().catch((error: unknown) => {
      setErrorMessage(error instanceof Error ? error.message : "Unable to load places.");
      setPlaces(localPlaces);
      setDataSource("local");
      setIsLoading(false);
    });
  }, [refreshPlaces]);

  const value = useMemo<PlacesContextValue>(
    () => ({
      dataSource,
      errorMessage,
      getPlace: (placeId) => getPlaceById(placeId, places),
      isLoading,
      places,
      refreshPlaces
    }),
    [dataSource, errorMessage, isLoading, places, refreshPlaces]
  );

  return <PlacesContext.Provider value={value}>{children}</PlacesContext.Provider>;
}

export function usePlaces() {
  const context = useContext(PlacesContext);

  if (!context) {
    throw new Error("usePlaces must be used inside PlacesProvider");
  }

  return context;
}
