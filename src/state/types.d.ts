import { pb } from "./pb/config";
import { PBUserRecord } from "./user";

export type TUser = PBUserRecord


export interface IUserSignUpFormFields{
    email: string
    password: string
    confirmPassword: string
    username: string
    name: string;
    github_username?:string;
}
