import { Outlet, RouterProvider } from "react-router-dom";

import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import { DashboardLayout } from "../layout/DashboardLayout";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ProtectedRoute } from "./ProtectedRoute";

// TODO Lazy load routes and page component
// TODO Auth handler, maybe a provider or from App.tsx pass through the Router component
// TODO Redirect based on auth
// TODO Create ErrorBoundary component and catch all component

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route errorElement={<div>ERROR</div>}>
			{/* ------------------------------- LOGIN ROUTE ------------------------------ */}
			<Route path="/login">
				<Route index element={<LoginPage />} />
			</Route>
			{/* ----------------------------- REGISTER ROUTE ----------------------------- */}
			<Route path="/register">
				<Route index element={<RegisterPage />} />
			</Route>
			{/* ------------------------------- APP ROUTES ------------------------------- */}
			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<DashboardLayout />}>
					<Route index element={<div>HOMEPAGE</div>} />
					<Route path="/pagetwo" element={<div>PAGE 2</div>} />
					<Route path="/pagethree" element={<div>PAGE 3</div>} />
				</Route>
			</Route>

			{/* ------------------------ CATCH ALL NOT FOUND ROUTE ----------------------- */}
			<Route path="*" element={<div>FALLBACK CATCH ALL ROUTES</div>} />
		</Route>,
	),
);

const Router = () => {
	return <RouterProvider router={router} />;
};

export { Router };
