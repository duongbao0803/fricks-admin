import { Error, Loading, ScrollToTop } from "@/components";
import { RolesLogin } from "@/enums";
import { useAuthStore } from "@/hooks/useAuthStore";
import DashboardLayout from "@/layout";
import AuthenPage from "@/pages/AuthenPage";
import React, { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";

export const ChartPage = lazy(() => import("@/pages/ChartPage"));
export const UserPage = lazy(() => import("@/pages/UserPage"));
export const StorePage = lazy(() => import("@/pages/StorePage"));
export const StoreDetailPage = lazy(() => import("@/pages/StoreDetailPage"));
export const ProductAdminPage = lazy(
  () => import("@/pages/product/ProductAdminPage"),
);
export const ProductStorePage = lazy(
  () => import("@/pages/product/ProductStorePage"),
);
export const ProductStoreDetailPage = lazy(
  () => import("@/pages/product/detail/ProductStoreDetail"),
);
export const AddProductStorePage = lazy(
  () => import("@/pages/product/detail/AddProductStore"),
);
export const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
export const OrderAdminPage = lazy(
  () => import("@/pages/order/OrderAdminPage"),
);

export const OrderStorePage = lazy(
  () => import("@/pages/order/OrderStorePage"),
);

export const OrderDetailPage = lazy(
  () => import("@/pages/order/OrderDetailPage"),
);


export const BrandPage = lazy(() => import("@/pages/BrandPage"));
export const PostPage = lazy(() => import("@/pages/post/PostPage"));
export const PostDetailPage = lazy(() => import("@/pages/post/PostDetailPage"));

export const WalletStorePage = lazy(() => import("@/pages/wallet/WalletStorePage"));

const Router: React.FC = () => {
  const isChecking = useAuthStore((s) => s.isChecking);
  const userInfo = useAuthStore((s) => s.userInfo);

  const isAdmin = userInfo?.role === RolesLogin.ADMIN;
  const isStore = userInfo?.role === RolesLogin.STORE;

  const routes = useRoutes([
    // {
    //   path: "/",
    //   element:
    //     isChecking && isAdmin ? <Navigate to="/chart" /> : <AuthenPage />,
    // },
    {
      path: "/",
      element: isChecking ? (
        isAdmin ? (
          <Navigate to="/chart" />
        ) : isStore ? (
          <Navigate to="/store/product" />
        ) : (
          <AuthenPage />
        )
      ) : (
        <AuthenPage />
      ),
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
          element: isAdmin ? (
            <ChartPage />
          ) : (
            <Navigate to="/store/product" replace />
          ),
        },
        {
          path: "/user",
          element: isAdmin ? (
            <UserPage />
          ) : (
            <Navigate to="/store/product" replace />
          ),
        },
        {
          path: "/store",
          element: isAdmin && <StorePage />,
        },
        {
          path: "/store/:id",
          element: isAdmin && <StoreDetailPage />,
        },
        {
          path: "/product",
          element: <ProductAdminPage />,
        },
        {
          path: "/store/product",
          element: <ProductStorePage />,
        },
        {
          path: "/brand",
          element: <BrandPage />,
        },

        {
          path: "/store/product/:id",
          element: <ProductStoreDetailPage />,
        },
        {
          path: "/store/product/add",
          element: <AddProductStorePage />,
        },
        {
          path: "/order",
          element: <OrderAdminPage />,
        },
        {
          path: "/store/order",
          element: <OrderStorePage />,
        },
        {
          path: "/store/order/:id",
          element: <OrderDetailPage />,
        },
        {
          path: "/category",
          element: <CategoryPage />,
        },
        {
          path: "/post",
          element: <PostPage />,
        },
        {
          path: "/post/:id",
          element: <PostDetailPage />,
        },
        {
          path: "/store/wallet",
          element: <WalletStorePage />,
        },
        { element: <Error />, path: "*" },
      ],
    },
  ]);

  return routes;
};

export default Router;
