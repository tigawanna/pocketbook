import { pb } from "../config";

export function usePbAuthListener() {
    pb.authStore.loadFromCookie(document?.cookie??"");
    pb.authStore.onChange(() => {
        document.cookie = pb.authStore.exportToCookie({ httpOnly: false });
    })
    return pb.authStore.model
}
