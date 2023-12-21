import { Nprogress } from "@/components/navigation/nprogress/Nprogress";
import {
  ClientSuspense,
  LayoutProps,
  PageContext,
  useLocation,
} from "rakkasjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import React from "react";
import { Sidebar } from "@/components/navigation/bars/sidebar";


function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const BreadCrumbs = React.lazy(
    () => import("@/components/navigation/BreadCrumbs"),
  );
  // console.log(" page ctx ==== ",page_ctx.locals.pb)
  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center ">
      {/* <Head description={"Resume building assistant"} /> */}
      <ClientSuspense fallback={<div></div>}>
        <Nprogress isAnimating={location && location?.pending ? true : false} />
      </ClientSuspense>
      <div className="w-full flex h-full gap-2">
        <div className="min-w-[5%] w-fit flex h-full gap-2">
          <Sidebar />
        </div>
        <div className="w-full flex flex-col gap-2 pt-2">
          {/* <div className="w-fit flex rounded-xl p-auto">
            <ClientSuspense fallback={<div className="h-5"></div>}>
              <BreadCrumbs />
            </ClientSuspense>
          </div> */}
          {children}
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {import.meta.env.DEV && <ReactQueryDevtoolsProduction />}
    </div>
  );
}
Layout.preload = (ctx: PageContext) => {
  return {
    head: {
      title: "Pocketbook",
      keywords: "frriends, meeting,groups,likes,social,pocketbook,pocketbase",
      description: " pocketbook your thoughts  ",
    },
  };
};

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import("@tanstack/react-query-devtools/build/modern/production.js").then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

export default Layout;
