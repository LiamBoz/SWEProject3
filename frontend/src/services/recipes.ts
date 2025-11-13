import { http } from "./http.ts"

export type Recipe = {
    id: number;
    recipe_name: string;
    total_time: string;
    rating: number;
    url: string;
    img_src: string; 
};

export type RecipeCreate = {
    recipe_name: string
    prep_time: string
    cook_time: string
    total_time: string
    servings: number
    ingredients: string
    directions: string
    // nutrition: string
};

export type RecipeResponse = {
    id: number;
    recipe_name: string;
    total_time: string;
    rating: number;
    url: string;
    img_src: string; 
    prep_time: string;
    cook_time: string;
    servings: number;
    ingredients: string;
    directions: string;
    nutrition: string;
    overview: string;
};

export async function getRecipes(): Promise<Recipe[]> {
    const res = await http.get("/recipes");
    return res.data as Recipe[];
}

export async function postRecipe(newRecipe: RecipeCreate): Promise<Boolean> {
    const res = await http.post("/recipes", newRecipe);
    return res.data as Boolean;
}

export async function getRecipe(id: number): Promise<RecipeResponse> {
    const res = await http.get(`recipes/${id}`);
    return res.data as RecipeResponse;
}