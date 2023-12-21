import { getFileURL } from "@/lib/pb/client";
import { useMutation, useQueryClient } from "rakkasjs";
import { usePageContext } from "rakkasjs";
import usericon from "./user-icon.svg";
import { UtilityStaffResponse } from "@/lib/pb/db-types";
export function useUser() {
  const page_ctx = usePageContext();
  const qc = useQueryClient();
  const locals = page_ctx.locals;
  const pb= locals.pb

  const clearAuthStore = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          page_ctx.locals.pb?.authStore.clear();
          document.cookie = locals.pb?.authStore.exportToCookie({
            httpOnly: false,
          });
          resolve();
        } catch (error) {
          reject(error);
        }
      }, 4000);
    });
  };

  const mutation = useMutation(
    async () => {
      return await clearAuthStore();
    },
    {
      onSuccess: () => {
        qc.invalidateQueries("pocketbook_user");
        window?.location && window?.location.reload();
      },
    },
  );

  const user = page_ctx.locals?.pb.authStore.model as UtilityStaffResponse

  const user_avatar = user?.avatar
    ? getFileURL({
        collection_id_or_name: "pocketbook_user",
        file_name: user.avatar,
        record_id: user.id,
      })
    : usericon;

  return {
    user,
    pb,
    user_mutation: mutation,
    page_ctx,
    loggout: mutation.mutate,
    user_avatar,
  };
}
