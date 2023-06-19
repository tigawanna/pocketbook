import jscookie from 'js-cookie'
import { useState } from 'react';
export type LocalCookieKeys = "theme" | "consent"

export type ConsentList = "theme"|"authentication"

export interface ConsentCookie{
    accepted:boolean;
    consent_list:ConsentList[]
}
export type ThemeCookie = "light" | "dark"


export function getSavedCookies(){
    return {
        theme:getLocalCookie("theme") as ThemeCookie|undefined,
        consent:JSON.parse(getLocalCookie("consent")??"{}") as ConsentCookie|undefined
    }
}


export function getLocalCookie(key: LocalCookieKeys) {
    return jscookie.get(key)
}


export function setLocalCookie(key: LocalCookieKeys, value: string) {
    return jscookie.set(key, value)
}



