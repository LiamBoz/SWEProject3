import { useMutation } from "@tanstack/react-query";
import { postRecipe } from "../services/recipes";

export function usePostRecipe() {
    return useMutation({
        mutationKey: ["postRecipe"],
        mutationFn: postRecipe,
    });
}
