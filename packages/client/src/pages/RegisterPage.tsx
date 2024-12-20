import { Button, CardBody, CardRoot, Center } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type RegisterRequest, registerSchema } from "@triplo/common";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormTextInput } from "../components/form/FormTextInput";

const registerFormSchema = registerSchema
	.extend({
		repeatPassword: z.string(),
	})
	.refine((data) => data.password === data.repeatPassword, {
		path: ["repeatPassword"],
		message: "Passwords don't match",
	});

type RegisterFormRequest = z.infer<typeof registerFormSchema>;

const RegisterFormDefaultValues: RegisterFormRequest = {
	username: "",
	email: "",
	password: "",
	repeatPassword: "",
};

const RegisterPage = () => {
	const { control, handleSubmit } = useForm<RegisterFormRequest>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: RegisterFormDefaultValues,
	});

	return (
		<Center className="flex items-center justify-center w-screen h-screen bg-neutral-800">
			<CardRoot h="auto" w="500px" p="10" bg="#f9fafb">
				<CardBody>
					<form
						onSubmit={handleSubmit(async (data: RegisterRequest) => {
							console.log(data);
						})}
					>
						<FormTextInput
							name="username"
							control={control}
							label="Username"
							rules={{
								minLength: { message: "testing error message", value: 5 },
							}}
							required={true}
						/>
						<FormTextInput
							name="email"
							control={control}
							label="Email"
							rules={{
								minLength: { message: "Email too short", value: 10 },
							}}
							required
						/>
						<FormTextInput
							name="password"
							control={control}
							label="Password"
							type="password"
							rules={{ minLength: 5 }}
							required
						/>
						<FormTextInput
							name="repeatPassword"
							control={control}
							label="Repeat Password"
							type="password"
							rules={{ minLength: 5 }}
							required
						/>
						<Button type="submit">Submit</Button>
					</form>
				</CardBody>
			</CardRoot>
		</Center>
	);
};

export { RegisterPage };
