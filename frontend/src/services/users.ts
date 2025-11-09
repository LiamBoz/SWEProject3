import { http } from "./http.ts"

export type UserInput = {
    username: string,
    password: string
};

export type UserResponse = {
    username: string
};

export async function createUser(newUser: UserInput): Promise<UserResponse> {
    const res = await http.post("/users", newUser);
    return res.data as UserResponse;
}

export async function loginUser(user: UserInput): Promise<UserResponse> {
    const res = await http.post("/users", user);
    return res.data as UserResponse;
}