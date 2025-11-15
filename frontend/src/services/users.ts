import { http } from "./http.ts"

export type UserInput = {
    username: string,
    password: string
};

export type UserResponse = {
    username: string
};

export interface FavoriteResponse {
  message: string;
}

export async function createUser(newUser: UserInput): Promise<UserResponse> {
    const res = await http.post("/users/", newUser);
    return res.data as UserResponse;
}

export async function loginUser(user: UserInput): Promise<UserResponse> {
    const res = await http.post("/users/login", user);
    return res.data as UserResponse;
}

export async function favoriteRecipe(username: string, recipe_id: number): Promise<FavoriteResponse> {
    const res = await http.post(`/users/${username}/favorites/${recipe_id}`);
    return res.data as FavoriteResponse;
}

export async function unfavoriteRecipe(username: string, recipe_id: number): Promise<FavoriteResponse> {
    const res = await http.delete(`/users/${username}/favorites/${recipe_id}`);
    return res.data as FavoriteResponse;
}

export async function isFavorited(username: string, recipe_id: number): Promise<Boolean> {
    const res = await http.get(`/users/${username}/favorites/${recipe_id}`);
    return res.data as Boolean;
}