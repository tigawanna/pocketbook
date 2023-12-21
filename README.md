# RAKKAS + TAILWIND
Rakkas js starter template 
Packages 

- tailwind+shadcn+daisyui for styling
    shadch add commands will work and put the components in scr/compnents/shadcn/ui
    buy default this tempalte comes with
    - button
    - dialog    
    - alert-dialog  
    - avatar        
    - card     
    - dropdown-menu  
    - popover      
    - input 
    - textarea
    - label          
    - checkbox 
    - select       
   run 
   ```sh
   npx shadcn-ui@latest add 
   ``` 
   to add [more component](https://ui.shadcn.com/docs/components/accordion)
   
   then run 
   ```sh
   npx daisyfy shadcn
   ``` 
   to make it work with the daisyui themes          

the theme is persietd using cokies for smooth SSR without hydration errors and FOUC 

```tsx
src/entry-hattip.tsx
      emitToDocumentHead() {
        const cookie_theme = requestContext?.cookie?.theme;
        return `
    <link rel="icon" type="image/svg+xml" href="/site.svg" />
    <script>
      (function() {
        document.documentElement.setAttribute("data-theme", "${cookie_theme}");
      })();
     </script>
     <script>$TQD=Object.create(null);$TQS=data=>Object.assign($TQD,data);</script>
  `;
      },
```
you can also change the favico/other attributes you want to inject to the ducumnet head there 
othere places this can be changed is in [preload functions](https://rakkasjs.org/guide/preload-function)
```tsx
src/routes/layout.tsx

Layout.preload = (ctx: PageContext) => {
  return {
    head: {
      title: "Chez Maison",
      keywords:
        "bills, property managent,tenancy,monthly,billing,invoice",
      description: "intergrated property management app  ",
    },
  };
};

```
or in the head component [read more](https://rakkasjs.org/guide/pages-and-basics)


to modify/add themes add the in the [tailwind config](/tailwind.config.js) daisyui object , [read more](https://daisyui.com/docs/themes/)

```ts
  daisyui: {
    //  3 themes
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["wireframe"],
          "color-scheme": "light",
          fontFamily: "",
          primary: "#433922",
          secondary: "#34d399",
          accent: "#343232",
          neutral: "#ffe4e6",
          info: "#62c2d5",
          accent: "#966919",
          success: "#25bbac",
          warning: "#c88314",
          error: "#e77982",
          "--rounded-btn": "1.9rem",
          "--tab-border": "2px",
          "--tab-radius": ".5rem",
        },
        dark: {
          ...require("daisyui/src/theming/themes")["wireframe"],
          accent: "#343232",
          fontFamily: "",
          "base-100": "#000000",
          "base-200": "#0D0D0D",
          "base-300": "#1A1919",
          neutral: "#272626",
          "color-scheme": "dark",
          primary: "#433922",
          secondary: "#34d399",
          accent: "#966919",
          info: "#62c2d5",
          success: "#25bbac",
          warning: "#c88314",
          error: "#e77982",
          "--rounded-btn": "1.9rem",
          "--tab-border": "2px",
          "--tab-radius": ".5rem",
        },

      },
    ],


  },
```



- tanstack/react-query for data fetching
  > fetching is done on SSR in the rakksjs hooks 
  - [entry-client.tsx](/src/entry-client.tsx)
  - [entry-hattip.tsx](/src/entry-hattip.tsx)
 
  [read more](https://github.com/rakkasjs/tanstack-query)

for server only fetchigg / mutation use useServerSideQuery and useServerSideMutation [read more](https://rakkasjs.org/guide/use-server-side-query)

- @tanem/react-nprogress : for nprogress bar on route change
- pocketbase + [typed-pocketbase](https://github.com/david-plugge/typed-pocketbase)
 To generate type , 
 run the command inside the pocketbase directory (same directory in which you run `./pocketbase serve` )
 ```sh
 npx typed-pocketbase --email ypurtypegen@email.com --password your_typegen_pasorword -o Database.d.ts
 ```
 then copy the Database.d.ts

