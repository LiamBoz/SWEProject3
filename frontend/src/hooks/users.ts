import { useMutation } from "@tanstack/react-query";
import { createUser, loginUser } from "../services/users";

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
