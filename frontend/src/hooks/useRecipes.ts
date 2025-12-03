import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getRecipes, getRecipe, getUserFavorites, delRecipe } from "../services/recipes";

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

export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => delRecipe(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      queryClient.invalidateQueries({ queryKey: ["recipe", id] });
    },
  });
}
