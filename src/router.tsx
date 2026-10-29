import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Off on purpose: the owner wants every visit/reload to open at the top of the home page.
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
