import { Button, Card, Center } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormTextInput } from "../components/form/FormTextInput";

interface RegisterFormValues {
	username: string;
	email: string;
	password: string;
	repeatPassword: string;
}

const RegisterFormDefaultValues: RegisterFormValues = {
	username: "",
	email: "",
	password: "",
	repeatPassword: "",
};

const RegisterPage = () => {
	const { control, handleSubmit } = useForm<RegisterFormValues>({
		defaultValues: RegisterFormDefaultValues,
	});

	return (
		<Center className="flex items-center justify-center w-screen h-screen bg-neutral-800">
			<Card
				h="auto"
				w="500px"
				p="10"
				bg="#f9fafb"
				rowGap="0"
				border="2px"
				borderColor="#60a5fa"
			>
				<form
					onSubmit={handleSubmit(async (data: RegisterFormValues) => {
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
						isRequired
					/>
					<FormTextInput
						name="email"
						control={control}
						label="Email"
						rules={{
							minLength: { message: "Email too short", value: 10 },
						}}
						isRequired
					/>
					<FormTextInput
						name="password"
						control={control}
						label="Password"
						type="password"
						rules={{ minLength: 5 }}
						isRequired
					/>
					<FormTextInput
						name="repeatPassword"
						control={control}
						label="Repeat Password"
						type="password"
						rules={{ minLength: 5 }}
						isRequired
					/>
					<Button type="submit">Submit</Button>
				</form>
			</Card>
		</Center>
	);
};

export { RegisterPage };
