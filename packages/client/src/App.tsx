import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./providers/AuthProvider";
import { Router } from "./routes";

function App() {
	return (
		<ChakraProvider>
			<AuthProvider>
				<Router />
			</AuthProvider>
		</ChakraProvider>
	);
}

export { App };
