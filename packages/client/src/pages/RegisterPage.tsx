import {
	Card,
	Center,
	Flex,
	FormControl,
	FormErrorMessage,
	FormHelperText,
	FormLabel,
	Input,
	Spacer,
} from "@chakra-ui/react";
import { useState } from "react";
import { FormTextInput } from "../components/form/FormTextInput";

const RegisterPage = () => {
	const [input, setInput] = useState();

	return (
		<Center className="flex items-center justify-center w-screen h-screen bg-neutral-900">
			<Card h="auto" w="500px" p="10" bg="gray.600" rowGap="30px">
				<FormControl>
					<FormLabel color="white" w="fit-content" fontSize="sm">
						First name
					</FormLabel>
					<Input
						onChange={(event) => setInput(event.target.value)}
						placeholder="Name"
						variant="filled"
					/>
					{/* TODO */}
					<FormTextInput name="test" control={"test" as any} label="test" />
				</FormControl>
				<FormControl>
					<FormLabel color="white" w="fit-content" fontSize="sm">
						Last name
					</FormLabel>
					<Input
						onChange={(event) => setInput(event.target.value)}
						placeholder="Name"
						variant="filled"
					/>
				</FormControl>
				<FormControl>
					<FormLabel color="white" w="fit-content" fontSize="sm">
						Phone
					</FormLabel>
					<Input placeholder="Phone" variant="filled" />
				</FormControl>
				<FormControl>
					<FormLabel color="white" w="fit-content" fontSize="sm">
						Email address
					</FormLabel>
					<Input placeholder="Email" variant="filled" />
				</FormControl>
				<FormControl>
					<FormLabel color="white" w="fit-content" fontSize="sm">
						Password
					</FormLabel>
					<Input placeholder="Password" variant="filled" type="password" />
				</FormControl>
				<FormControl>
					<FormLabel color="white" w="fit-content" fontSize="sm">
						Repeat password
					</FormLabel>
					<Input
						placeholder="Repeat password"
						variant="filled"
						type="password"
					/>
				</FormControl>
			</Card>
		</Center>
	);
};

export { RegisterPage };
