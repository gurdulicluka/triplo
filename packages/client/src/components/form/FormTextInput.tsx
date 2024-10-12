import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	type InputProps,
} from "@chakra-ui/react";
import {
	type Control,
	type FieldPath,
	type FieldValues,
	type Path,
	type RegisterOptions,
	type UseFormReturn,
	useController,
} from "react-hook-form";

interface FormTextInputProps<T extends FieldValues> extends InputProps {
	name: string;
	control: Control<T>;
	label: string;
	rules?: RegisterOptions<T>;
}

const FormTextInput = <T extends FieldValues>(props: FormTextInputProps<T>) => {
	const { name, control, label, rules, ...inputProps } = props;
	// useController hook from react-hook-form
	const {
		field,
		fieldState: { error },
	} = useController({
		name,
		control,
		rules,
	});

	return (
		<FormControl isInvalid={!!error}>
			{label && <FormLabel htmlFor={name}>{label}</FormLabel>}
			<Input id={name} {...field} {...inputProps} />
			{error && <FormErrorMessage>{error.message}</FormErrorMessage>}
		</FormControl>
	);
};

export { FormTextInput };
