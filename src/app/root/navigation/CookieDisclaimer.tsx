import { CookieDialog } from "@/components/dialog/CookieDialog";
import { DialogWrapper } from "@/components/dialog/DialodWrapper";
import { SheetWraper } from "@/components/dialog/SheetWraper";
import { getLocalCookie, getSavedCookies } from "@/state/cookie";
import { useState } from "react";

interface CookieDisclaimerProps {

}

export function CookieDisclaimer({}:CookieDisclaimerProps){
const consentCookie = getSavedCookies()
const [open,setOpen]=useState(true)
console.log("consentCookie === " , consentCookie);
if(!consentCookie.consent?.accepted){
return (
    <CookieDialog open={open} setOpen={setOpen}>
        <h2 className="tex-5xl font-bold">IT'S COOKIE TIME</h2>
    </CookieDialog>

 )
 }
return (
null
);
}
