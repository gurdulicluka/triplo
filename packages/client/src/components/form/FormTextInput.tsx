import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	type InputProps,
} from "@chakra-ui/react";
import {
	type Control,
	type FieldValues,
	type Path,
	type RegisterOptions,
	useController,
} from "react-hook-form";

interface FormTextInputProps<T extends FieldValues> extends InputProps {
	name: Path<T>;
	control: Control<T>;
	label: string;
	rules?: Omit<RegisterOptions<T>, "required">;
}

const FormTextInput = <T extends FieldValues>(props: FormTextInputProps<T>) => {
	const { name, control, label, rules, ...inputProps } = props;

	const {
		field,
		fieldState: { error },
	} = useController({
		name,
		control,
		rules,
	});

	return (
		<FormControl
			position="relative"
			mb="8"
			isRequired={inputProps.isRequired}
			isInvalid={!!error}
		>
			{label && (
				<FormLabel w="fit-content" htmlFor={name}>
					{label}
				</FormLabel>
			)}
			<Input
				focusBorderColor={error ? "red.500" : ""}
				id={name}
				{...field}
				{...inputProps}
			/>
			{error?.message && (
				<FormErrorMessage position="absolute" className="-bottom-5">
					{error.message}
				</FormErrorMessage>
			)}
		</FormControl>
	);
};

export { FormTextInput };
