import { Button, Card, Center } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormTextInput } from "../components/form/FormTextInput";

interface RegisterFormValues {
	name: string;
	phone: string;
	email: string;
	password: string;
	repeatPassword: string;
}

const RegisterFormDefaultValues: RegisterFormValues = {
	name: "",
	phone: "",
	email: "",
	password: "",
	repeatPassword: "",
};

const RegisterPage = () => {
	const { control, handleSubmit } = useForm<RegisterFormValues>({
		defaultValues: RegisterFormDefaultValues,
	});

	return (
		<Center className="flex items-center justify-center w-screen h-screen bg-neutral-300">
			<Card h="auto" w="500px" p="10" bg="white" rowGap="0">
				<form
					onSubmit={handleSubmit(async (data: RegisterFormValues) => {
						console.log(data);
					})}
				>
					<FormTextInput
						name="name"
						control={control}
						label="Name"
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
						name="phone"
						control={control}
						label="Phone number"
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
