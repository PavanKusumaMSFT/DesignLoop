"use client";

import type React from "react";
import { createContext, useContext, useState, type ReactNode } from "react";

export interface FavoriteService {
  id: string;
  name: string;
  icon: string;
  category: string;
}

interface FavoritesContextType {
  favorites: Set<string>;
  favoriteServices: FavoriteService[];
  toggleFavorite: (service: FavoriteService) => void;
  isFavorite: (id: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favoriteServices, setFavoriteServices] = useState<FavoriteService[]>(
    [],
  );

  const favorites = new Set(favoriteServices.map((s) => s.id));

  const toggleFavorite = (service: FavoriteService) => {
    setFavoriteServices((prev) => {
      if (prev.some((s) => s.id === service.id)) {
        return prev.filter((s) => s.id !== service.id);
      }
      return [...prev, service];
    });
  };

  const isFavorite = (id: string) => favorites.has(id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, favoriteServices, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
