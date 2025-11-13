import Input from '@/components/Input/Input';
import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  RegisterOptions,
  FieldPath,
} from 'react-hook-form';

interface FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  register: UseFormRegister<TFieldValues>;
  errors: FieldErrors<TFieldValues>;
  name: TName;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  required?: boolean | string;
  disabled?: boolean;
  validation?: Omit<RegisterOptions<TFieldValues, TName>, 'required' | 'disabled'>;
  helperText?: string;
}

export default function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  register,
  errors,
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  validation,
  helperText,
}: Readonly<FormFieldProps<TFieldValues, TName>>) {
  const requiredRule = typeof required === 'string'
    ? required
    : required
    ? `${label} is required`
    : undefined;

  const fieldError = errors[name];
  const errorMessage = fieldError?.message as string | undefined;

  return (
    <Input
      {...register(name, {
        ...validation,
        ...(requiredRule && { required: requiredRule }),
        ...(disabled && { disabled }),
      } as RegisterOptions<TFieldValues, TName>)}
      id={name}
      label={label}
      type={type}
      placeholder={placeholder}
      error={errorMessage}
      helperText={helperText}
      aria-invalid={fieldError ? 'true' : 'false'}
    />
  );
}
