import { Error, Loading, ScrollToTop } from "@/components";
import { useAuthStore } from "@/hooks/useAuthStore";
import DashboardLayout from "@/layout";
import AuthenPage from "@/pages/AuthenPage";
import StoreDetailPage from "@/pages/StoreDetailPage";
import StorePage from "@/pages/StorePage";
import UserPage from "@/pages/UserPage";
import ProductPage from "@/pages/UserPage copy";
import React, { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

export const ChartPage = lazy(() => import("@/pages/ChartPage"));

// const checkAccessAdmin = (role: string) => {
//   return role === Roles.ADMIN;
// };

// const checkAccessStore = (role: string) => {
//   return role === Roles.STORE;
// };

const Router: React.FC = () => {
  const { isChecking } = useAuthStore();
  // const role = userInfo?.role;
  // let hasAccessAdmin = false;
  // let hasAccessStore = false;

  // if (userInfo?.role !== null && typeof role === "string") {
  //   hasAccessAdmin = checkAccessAdmin(role);
  //   hasAccessStore = checkAccessStore(role);
  // }

  const routes = useRoutes([
    {
      path: "/",
      element: isChecking ? <Navigate to="/chart" /> : <AuthenPage />,
    },
    {
      element: isChecking ? (
        <DashboardLayout>
          <ScrollToTop>
            <Suspense fallback={<Loading size="large" tip="Đang chờ" />}>
              <Outlet />
            </Suspense>
          </ScrollToTop>
        </DashboardLayout>
      ) : (
        <Navigate to="/" />
      ),
      children: [
        {
          path: "/chart",
          element: <ChartPage />,
        },
        {
          path: "/user",
          element: <UserPage />,
        },
        {
          path: "/store",
          element: <StorePage />,
        },
        {
          path: "/product",
          element: <ProductPage />,
        },

        { element: <Error />, path: "*" },
      ],
    },
  ]);

  return routes;
};

export default Router;
