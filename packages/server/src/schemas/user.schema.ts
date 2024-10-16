import { z } from "zod";

const userSchema = z.object({
	username: z.string().min(2, "Name is required"),
	email: z.string().email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

type UserType = z.infer<typeof userSchema>;

export { userSchema };
export type { UserType };
