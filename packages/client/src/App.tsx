import { Provider } from "./components/ui/provider";
import { AuthProvider } from "./providers/AuthProvider";
import { Router } from "./routes";

function App() {
	return (
		<Provider>
			<AuthProvider>
				<Router />
			</AuthProvider>
		</Provider>
	);
}

export { App };
