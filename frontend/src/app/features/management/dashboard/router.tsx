// import { lazy } from "react";
import "../../../assets/fontello/css/fontello.css";
import { RootComponent } from "../../../components/layouts/root-component";
import { Route } from "react-router-dom";
import { RouteErrorBoundary } from "../../../core/error-handling/error-boundary";
import { PrivateRoute } from "../../../components/routes/private-route";

// const AdminDashboard = lazy(() => import("../../../features/common/dashboards/admin-dashboard"));
// const ChangePassword = lazy(() => import("../../../features/common/identity/accounts/change-password/change-password"));
// const MyProfile = lazy(() => import("../../../features/common/identity/my-profile/my-profile/my-profile"));
// const Users = lazy(() => import("../../../features/management/users/user-data-grid"));
// const AppCoreLayout = lazy(() => import("../../../components/layouts/app-core-layout"));

// const PageNotFound = lazy(
//   () => import("../../../components/pages/page-not-found")
// );

export const routerAdmin = () => (
  
    <Route
      element={<RootComponent />}
      lazy={() => import("../../../core/startup/load-initial-data")}
      errorElement={<RouteErrorBoundary />}
    >
      {/* <Route path="*" element={<PageNotFound />} /> */}

      <Route index element={<div>Index</div>} />
      <Route
        path="dashboard"
        element={<PrivateRoute children={<div>dashboard</div>} />}
      />
      <Route
        path="login"
        element={<PrivateRoute children={<div>login</div>} />}
      />
      <Route
        path="/users"
        element={<PrivateRoute children={<div>users</div>} />}
      />
    </Route>
  
);
