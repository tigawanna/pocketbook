import { pb } from "./pb/config";

export type TUser = typeof pb.authStore.model


export interface IUserSignUpFormFields{
    email: string
    password: string
    confirmPassword: string
    username: string
    name: string;
    github_username?:string;
}
