import { Error, Loading, ScrollToTop } from "@/components";
import DashboardLayout from "@/layout";
import { AuthenView } from "@/sections/auth/view";
import React, { lazy, Suspense } from "react";
import { Outlet, useRoutes } from "react-router-dom";

export const ChartPage = lazy(() => import("@/pages/ChartPage"));

const Router: React.FC = () => {
  const routes = useRoutes([
    { path: "/", element: <AuthenView /> },
    {
      element: (
        <DashboardLayout>
          <ScrollToTop>
            <Suspense fallback={<Loading size="large" tip="Đang chờ" />}>
              <Outlet />
            </Suspense>
          </ScrollToTop>
        </DashboardLayout>
      ),
      children: [
        {
          path: "/chart",
          element: <ChartPage />,
        },
        {
          path: "*",
          element: <Error />,
        },
      ],
    },
  ]);

  return routes;
};

export default Router;
