import { http } from "./http.ts"

export type Recipe = {
    id: number;
    recipe_name: string;
    total_time: string;
    rating: number;
    url: string;
    img_src: string; 
};

export async function getRecipes(): Promise<Recipe> {
		const res = await http.get("/recipes");
		return res.data as Recipe;
}
