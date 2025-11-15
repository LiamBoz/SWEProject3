import { useMutation, useQuery } from "@tanstack/react-query";
import { createUser, loginUser, favoriteRecipe, unfavoriteRecipe, isFavorited } from "../services/users";
import type { FavoriteResponse } from "../services/users";

export function useCreateUser() {
    return useMutation({
        mutationKey: ["userCreate"],
        mutationFn: createUser,
    });
}

export function useLoginUser() {
    return useMutation({
        mutationKey: ["userLogin"],
        mutationFn: loginUser,
    });
}

export function useFavoriteRecipe() {
  return useMutation<FavoriteResponse, Error, { username: string; recipeId: number }>({
    mutationKey: ["favoriteRecipe"],
    mutationFn: ({ username, recipeId }) =>
      favoriteRecipe(username, recipeId),
  });
}

export function useUnfavoriteRecipe() {
  return useMutation<FavoriteResponse, Error, { username: string; recipeId: number }>({
    mutationKey: ["unfavoriteRecipe"],
    mutationFn: ({ username, recipeId }) =>
      unfavoriteRecipe(username, recipeId),
  });
}

export function useIsFavorited(
  username: string,
  recipeId: number
) {
  return useQuery({
    queryKey: ["isFavorited", username, recipeId],
    queryFn: () => isFavorited(username, recipeId),
    enabled: !!username && !!recipeId, // avoid running if missing data
  });
}