import { CookieDialog } from "@/components/dialog/CookieDialog";
import { AlertDialogHeader, AlertDialogFooter } from "@/shadcn/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { acceptCookies, getSavedCookies, rejectCookies } from "@/state/cookie";
import {
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@radix-ui/react-alert-dialog";
import { Info } from "lucide-react";
import { useState } from "react";

interface CookieDisclaimerProps {}

export function CookieDisclaimer({}: CookieDisclaimerProps) {
  const consentCookie = getSavedCookies();
  const [open, setOpen] = useState(true);


  if (consentCookie.consent?.accepted) {
    return (
        <CookieDialog open={open} setOpen={setOpen}>
        <div
          className="w-full bg-primary  font-medium text-sm p-4 flex items-center justify-center gap-5"
          role="alert">
          <AlertDialogHeader className="flex flex-row items-center justify-between">
            <AlertDialogTitle>
              <span className="mr-2 ">We use cookies to enhance your experience</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
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
                      Disabling cookies might require you to sign in multiple times per session , 
                      We won't even remember your choice 
                    </li>
                    <li className="text-xs">We do not use any third party cookies</li>
                  </ul>
                </PopoverContent>
              </Popover>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-2">
            <AlertDialogCancel>
              <button
                onClick={() => rejectCookies()}
                className="bg-destructive hover:text-destructive px-3 py-1 
            rounded-sm focus:outline-none"
                type="button"
                aria-label="Reject cookies">
                Reject
              </button>
            </AlertDialogCancel>

            <AlertDialogAction>
              <button
                onClick={() => acceptCookies()}
                className="bg-accent hover:text-accent-foreground px-3 py-1 
            rounded-sm focus:outline-none"
                type="button"
                aria-label="Accept cookies">
                Accept
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </CookieDialog>
    );
  }
  return(
    <div className="bg-primary/70 shadow-secondary animate-in fade-in text-sm w-full
    flex flex-col md:flex-row gap-2 md:gap-5 items-center justify-center fixed bottom-0 p-5 rounded">
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
              Disabling cookies might require you to sign in multiple times per session ,
              We won't even remember your choice
            </li>
            <li className="text-xs">We do not use any third party cookies</li>
          </ul>
        </PopoverContent>
      </Popover>

      <div className="flex gap-2">
        <button
          onClick={() => acceptCookies()}
          className="bg-accent hover:text-accent-foreground px-3 py-1 
            rounded-sm focus:outline-none"
          type="button"
          aria-label="Accept cookies">
          Accept
        </button>
        <button
          onClick={() => rejectCookies()}
          className="bg-destructive hover:text-destructive px-3 py-1 
            rounded-sm focus:outline-none"
          type="button"
          aria-label="Reject cookies">
          Reject
        </button>
      </div>


    </div>
  )
}
