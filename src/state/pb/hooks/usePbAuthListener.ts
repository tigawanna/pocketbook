import { useUserStore } from "@/state/zustand/user";
import { pb } from "../config";
import { useEffect } from "react";
import { PBUserRecord } from "@/state/user";

export function usePbAuthListener() {
    const { updateUser } = useUserStore()
    useEffect(() => {
        pb.authStore.loadFromCookie(document?.cookie ?? "");
       const authChange = pb.authStore.onChange(() => {
            document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
            updateUser(pb.authStore.model as unknown as PBUserRecord)
        })
        return () => {
            //  call to clean up the listener
            authChange()
        };
    }, []);
    return pb.authStore.model
}
