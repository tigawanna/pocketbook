import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/ui/select";

interface ThemeToggleModalProps {}

export function ThemeToggle({}: ThemeToggleModalProps) {
  const theme_list = [
    "light",
    "dark",
    // "cupcake",
    // "custom",
    // "wireframe",
    // "black",
    // "acid",
    // "night",
    // "coffee",
    // "dim",
    // "nord",
    // "sunset",
  ];
  const [theme, setTheme] = useState<string>(""); // Step 1: Create state variable for theme
  useEffect(() => {
    // Step 2: Run code on first mount
    if (window) {
      const initialTheme =
        document?.documentElement?.getAttribute("data-theme"); // Step 4: Retrieve initial theme
      setTheme(initialTheme ?? ""); // Step 5: Update state variable with initial theme
    }
  }, []);

  const handleThemeChange = (newTheme: string) => {
    if (window) {
      setTheme(newTheme);
      document?.documentElement?.setAttribute("data-theme", newTheme);
      document.cookie = `theme=${newTheme}`;
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1 p-5">
      {/* <Label>Theme</Label> */}
      <Select
        data-choose-theme
        value={theme}
        onValueChange={(e) => {
          handleThemeChange(e);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{theme}</SelectLabel>
            {theme_list.map((theme) => {
              return (
                <SelectItem key={theme} value={theme}>
                  {theme}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
