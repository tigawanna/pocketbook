import { canUseCookies } from "../cookie";
import { pb } from "../pb/config";
import { useEffect } from "react";

export function usePbAuthListener() {
  useEffect(() => {
    // console.log("user changed  ===", pb.authStore.model);
    pb.authStore.loadFromCookie(document?.cookie ?? "");
    const authChange = pb.authStore.onChange(() => {
      if (canUseCookies()) {
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
      }
    });
    return () => {
      //  call to clean up the listener
      authChange();
    };
  }, []);
  return pb.authStore.model;
}
