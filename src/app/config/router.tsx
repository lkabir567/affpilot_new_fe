import DashboardLayout from "@/pages/private/dashboard/DashboardLayout";
import OverviewPage from "@/pages/private/dashboard/overview/OverviewPage";
import { createBrowserRouter } from "react-router-dom";

import NotFoundPage from "@/pages/public/not-found/NotFoundPage";
import { ErrorBoundary } from "../core/ErrorBoundary";
import { AuthGuard } from "../core/route-protection/AuthGuard";
import { contentGenerationRoute } from "./routes/content-route/content.route";
import { publicRoutes } from "./routes/public.routes";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorBoundary />,
    children: [
      ...publicRoutes,
      {
        element: (
          <AuthGuard>
            <DashboardLayout />
          </AuthGuard>
        ),
        children: [
          {
            path: "/",
            element: <OverviewPage />,
          },
          ...contentGenerationRoute,
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
