import { useUserStore } from "@/state/zustand/user";
import { pb } from "../config";
import { useEffect } from "react";

export function usePbAuthListener() {
    const { updateUser } = useUserStore()
    useEffect(() => {
        pb.authStore.loadFromCookie(document?.cookie ?? "");
       const authChange = pb.authStore.onChange(() => {
            document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
            console.log("updated user  === ", pb.authStore.model)
            updateUser(pb.authStore.model)
        })
        return () => {
            //  call to clean up the listener
            authChange()
        };
    }, []);
    return pb.authStore.model
}
