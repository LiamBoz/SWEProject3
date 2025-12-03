import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecipes, getRecipe, getUserFavorites } from "../services/recipes";

export function useRecipes() {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
    refetchOnWindowFocus: false,
  });
}

export function useRecipe(id: number) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(id),
    refetchOnWindowFocus: false,
  });
}

export function useUserFavorites(username: string) {
  return useQuery({
    queryKey: ["userFavorites", username],
    queryFn: () => getUserFavorites(username),
    refetchOnWindowFocus: false,
  });
}

export function delRecipe(id: number) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => delRecipe(id),
    refetchOnWindowFocus: false,
  });
}
