import {
	type PropsWithChildren,
	createContext,
	useContext,
	useState,
} from "react";

interface AuthContextType {
	isAuthenticated: boolean;
	login: () => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const AuthProvider = ({ children }: PropsWithChildren<any>) => {
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	const login = () => setIsAuthenticated(true);
	const logout = () => setIsAuthenticated(false);

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};

export { useAuth, AuthProvider };
