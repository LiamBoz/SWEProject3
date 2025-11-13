import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecipes, getRecipe } from "../services/recipes";

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