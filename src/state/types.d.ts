import { pb } from "./pb/config";

type TUser = typeof pb.authStore.model


export interface IUserSignUpFormFields{
    email: string
    password: string
    confirmPassword: string
    username: string
    name: string;
    github_username?:string;
}
