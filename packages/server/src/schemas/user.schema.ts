import { z } from "zod";

const updateUserSchema = z.object({
	username: z
		.string()
		.min(2, "Username needs to have at least 2 characters")
		.optional(),
	email: z.string().email("Invalid email address").optional(),
});

type UpdateUserRequest = z.infer<typeof updateUserSchema>;

export { updateUserSchema };
export type { UpdateUserRequest };
