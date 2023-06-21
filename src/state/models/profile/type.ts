import { PBUserRecord } from "../user/types";

export type TProfileFormInput = Omit<
  PBUserRecord,
  | "collectionId"
  | "collectionName"
  | "updated"
  | "expand"
  | "verified"
  | "github_avatar"
  | "id"
  | "access_token"
  | "created"
>;
