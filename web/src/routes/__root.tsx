import Navbar from "@/components/navbar";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="w-screen  px-32">
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
