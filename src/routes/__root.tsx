import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { HeadContent } from "@tanstack/react-router";

import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { AuthContext } from "@/lib/auth";

interface MyRouterContext {
  queryClient: QueryClient;
  auth: AuthContext;
}

import { NotFoundComponent } from "@/components/ui/not-found";
import { ErrorComponent } from "@/components/ui/error-component";
import { LoadingScreen } from "@/components/ui/loading-screen";

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Lendsqr Fe Test",
      },
    ],
  }),
  component: () => (
    <>
      <HeadContent />
      <Outlet />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: "Tanstack Query",
            render: <ReactQueryDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
  pendingComponent: LoadingScreen,
});
