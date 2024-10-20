import { z } from "zod";

const registerSchema = z.object({
	username: z.string().min(2, "Name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

const refreshSessionSchema = z.object({
	refreshToken: z.string(),
});

type RegisterRequest = z.infer<typeof registerSchema>;
type LoginRequest = z.infer<typeof loginSchema>;
type RefreshSessionRequest = z.infer<typeof refreshSessionSchema>;

export { registerSchema, loginSchema, refreshSessionSchema };
export type { RegisterRequest, LoginRequest, RefreshSessionRequest };
