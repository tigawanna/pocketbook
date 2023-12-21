import { PocketBaseClient } from "@/lib/pb/client";
import { useEffect } from "react";

export function usePbAuthListener(pb:PocketBaseClient) {
  useEffect(() => {
    // console.log("user changed  ===", pb.authStore.model);
    pb.authStore.loadFromCookie(document?.cookie ?? "");
    const authChange = pb.authStore.onChange(() => {
      // if (canUseCookies()) {
      //   document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
      // }
    });
    return () => {
      //  call to clean up the listener
      authChange();
    };
  }, []);
  return pb.authStore.model;
}
