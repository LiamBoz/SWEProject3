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
    nutrition: string
    overview: string
    rating: number
    url: string
    img_src: string
    cuisine_path: string
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

function cleanRecipeData(recipe: RecipeCreate): RecipeResponse {
    const cleanedRecipe: any = {};
    for(const key in recipe){
        if(recipe[key] === undefined || recipe[key] === null || recipe[key] === ""){
            recipe[key] = "NaN";
            console.log(recipe[key]);
            console.log("undefined or null found");
        }
        cleanedRecipe[key] = recipe[key];
        console.log(`key: ${key}, value: ${recipe[key]}`);
    }
    console.log("this function is being called");
    cleanedRecipe.nutrition = "NaN";
    cleanedRecipe.overview = "NaN";
    cleanedRecipe.rating = 0;
    cleanedRecipe.url = "NaN";
    cleanedRecipe.img_src = "NaN";
    console.log(cleanedRecipe.nutrition);
    return cleanedRecipe as RecipeResponse;
}

export async function getRecipes(): Promise<Recipe[]> {
    const res = await http.get("/recipes");
    return res.data as Recipe[];
}

export async function postRecipe(newRecipe: RecipeCreate): Promise<Boolean> {
    const cleanedRecipe = cleanRecipeData(newRecipe);
    const res = await http.post("/recipes", cleanedRecipe);
    return res.data as Boolean;
}

export async function getRecipe(id: number): Promise<RecipeResponse> {
    const res = await http.get(`recipes/${id}`);
    return res.data as RecipeResponse;
}

export async function getUserFavorites(username: string): Promise<Recipe[]> {
    const res = await http.get(`/users/${username}/favorites`);
    return res.data as Recipe[];
}

export async function delRecipe(id: number): Promise<Boolean> {
    const res = await http.delete(`recipes/${id}`);
    return res.data as Boolean;
}
