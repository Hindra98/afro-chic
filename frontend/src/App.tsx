import { lazy } from "react";
import "./App.css";
import "./app/assets/fontello/css/fontello.css";
import { RootComponent } from "./app/components/layouts/root-component";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { RouteErrorBoundary } from "./app/core/error-handling/error-boundary";
import OpenRouteLayout from "./app/components/layouts/open-route-layout";
import { PrivateRoute } from "./app/components/routes/private-route";
import { Dashboard } from "./app/features/management/dashboard";

const Authentication = lazy(
  () => import("./app/features/common/identity/oauth/login")
);
const Register = lazy(
  () => import("./app/features/common/identity/oauth/register")
);
const VerifyIdentity = lazy(
  () => import("./app/features/common/identity/accounts/verify-identity")
);
const ForgotPassword = lazy(
  () => import("./app/features/common/identity/accounts/forgot-password")
);
const ResetPassword = lazy(
  () => import("./app/features/common/identity/accounts/reset-password")
);
const Product = lazy(
  () =>
    import(
      "./app/features/common/products/product"
    )
);
const Home = lazy(
  () =>
    import(
      "./app/features/common/home/home"
    )
);
const Shop = lazy(
  () =>
    import(
      "./app/features/common/shop/shop"
    )
);
const Cart = lazy(
  () =>
    import(
      "./app/features/common/cart/cart"
    )
);
const MyProfile = lazy(
  () =>
    import("./app/features/common/identity/my-profile/my-profile/my-profile")
);
const Users = lazy(
  () => import("./app/features/management/users/user-data-grid")
);
const PageNotFound = lazy(
  () => import("./app/components/pages/page-not-found")
);
const AppCoreLayout = lazy(
  () => import("./app/components/layouts/app-core-layout")
);

// Administration components
const LoginDashboard = lazy(
  () => import("./app/features/management/dashboard/pages/login")
);
const AdminDashboard = lazy(
  () => import("./app/features/management/dashboard/pages/dashboard")
);
const ForgotPassDashboard = lazy(
  () => import("./app/features/management/dashboard/pages/forgot-password")
);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        element={<RootComponent />}
        lazy={() => import("./app/core/startup/load-initial-data")}
        errorElement={<RouteErrorBoundary />}
      >
        <Route path="*" element={<PageNotFound />} />

        <Route
          element={<AppCoreLayout />}
          errorElement={<RouteErrorBoundary />}
        >
          <Route index element={<Home />} />
          <Route
            path="/home"
            element={<PrivateRoute children={<Home />} />}
          />
          <Route
            path="/shop"
            element={<PrivateRoute children={<Shop />} />}
          />
          <Route
            path="/cart"
            element={<PrivateRoute children={<Cart />} />}
          />
          <Route
            path="/product"
            element={<PrivateRoute children={<Product />} />}
          />
          <Route
            path="/users"
            element={<PrivateRoute children={<Users />} />}
          />
        </Route>

        <Route
          path="/account"
          element={<OpenRouteLayout />}
          errorElement={<RouteErrorBoundary />}
        >
          <Route index element={<MyProfile />} />
          <Route path="login" element={<Authentication />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-identity" element={<VerifyIdentity />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        <Route
          path="/admin"
          element={<PrivateRoute children={<Dashboard />} />}
          errorElement={<RouteErrorBoundary />}
        >
          <Route index element={<AdminDashboard />} />
          <Route
            path="dashboard"
            element={<PrivateRoute children={<AdminDashboard />} />}
          />
          <Route
            path="login"
            element={<PrivateRoute children={<LoginDashboard />} />}
          />
          <Route
            path="app"
            element={<PrivateRoute children={<div>app</div>} />}
          />
          <Route
            path="users"
            element={<PrivateRoute children={<div>users</div>} />}
          />
          <Route
            path="forgot-password"
            element={<PrivateRoute children={<ForgotPassDashboard />} />}
          />
        </Route>
      </Route>
    </>
  )
);
