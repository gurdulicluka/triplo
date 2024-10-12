import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
	return (
		<div className="flex items-center justify-center w-screen h-screen text-5xl font-bold text-pink-300 uppercase bg-slate-800">
			<Outlet />
		</div>
	);
};

export { DashboardLayout };
