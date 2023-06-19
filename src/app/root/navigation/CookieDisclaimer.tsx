import { DialogWrapper } from "@/components/dialog/DialodWrapper";
import { getLocalCookie, getSavedCookies } from "@/state/cookie";
import { useState } from "react";

interface CookieDisclaimerProps {

}

export function CookieDisclaimer({}:CookieDisclaimerProps){
const consentCookie = getSavedCookies()
console.log("consentCookie === " , consentCookie);
if(!consentCookie.consent?.accepted){
return (
    <DialogWrapper>
<div className='fixed bottom-0 w-full h-[150px] flex 
 items-center justify-center bg-red-700 z-50 animate-in slide-in-from-bottom
 duration-1000'>
            accept cookies or else
        </div>
    </DialogWrapper>

 )
 }
return (
null
);
}
