import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecipes } from "../services/recipes";

export function useRecipes() {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
    refetchOnWindowFocus: false,
  });
}
