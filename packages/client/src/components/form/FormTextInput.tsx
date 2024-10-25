import {
	FieldErrorText,
	FieldLabel,
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
import { Field } from "../ui/field";

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

	// TODO Tailwind Preflight is turned off because it messes with chakra ui
	return (
		<Field
			position="relative"
			mb="8"
			required={inputProps.required}
			invalid={!!error}
		>
			{label && (
				<FieldLabel color="black" w="fit-content" htmlFor={name}>
					{label}
				</FieldLabel>
			)}
			<Input
				color="black"
				focusRingColor={error ? "red.500" : ""}
				id={name}
				{...field}
				{...inputProps}
			/>
			{error?.message && (
				<FieldErrorText position="absolute" className="-bottom-5">
					{error.message}
				</FieldErrorText>
			)}
		</Field>
	);
};

export { FormTextInput };
