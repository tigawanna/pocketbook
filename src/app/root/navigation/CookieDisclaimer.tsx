import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { acceptCookies, getSavedCookies, rejectCookies } from "@/state/cookie";
import { Info } from "lucide-react";
import { useState } from "react";

interface CookieDisclaimerProps {}

export function CookieDisclaimer({}: CookieDisclaimerProps) {
  const consentCookie = getSavedCookies();
  const [open, setOpen] = useState(consentCookie.consent?.accepted);

  if (!open) {
    return (
      <div
        className="bg-primary/70 shadow-secondary animate-in fade-in text-sm w-full
    flex flex-col md:flex-row gap-2 md:gap-5 items-center justify-center fixed bottom-0 p-5 rounded"
      >
        <span className="mr-2 ">We use cookies to enhance your experience</span>
        <Popover>
          <PopoverTrigger>
            <Info className="h-4 w-4 border-none hover:text-accent-foreground" />
          </PopoverTrigger>
          <PopoverContent className="p-5">
            <h2 className="text-sm border-b">
              We use cookies to store your login and user preferences{" "}
            </h2>
            <ul className="list-disc flex flex-col gap-1 p-2">
              <li className="text-xs">
                Disabling cookies might require you to sign in multiple times
                per session , We wiil not even remember your choice
              </li>
              <li className="text-xs">We do not use any third party cookies</li>
            </ul>
          </PopoverContent>
        </Popover>

        <div className="flex gap-2">
          <button
            onClick={() => {
              acceptCookies();
              setOpen(true);
            }}
            className="bg-accent hover:text-accent-foreground px-3 py-1 
            rounded-sm focus:outline-none"
            type="button"
            aria-label="Accept cookies"
          >
            Accept
          </button>
          <button
            onClick={() => {
              rejectCookies();
              setOpen(true);
            }}
            className="bg-destructive hover:text-destructive px-3 py-1 
            rounded-sm focus:outline-none"
            type="button"
            aria-label="Reject cookies"
          >
            Reject
          </button>
        </div>
      </div>
    );
  }
  return null;
}
