import Input from '@/components/Input/Input';

interface FormFieldProps {
  form: any;
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  validator?: ({ value }: { value: string }) => string | undefined;
}

export default function FormField({
  form,
  name,
  label,
  type = 'text',
  placeholder,
  required = false,
  disabled = false,
  validator,
}: Readonly<FormFieldProps>) {
  return (
    <form.Field
      name={name}
      validators={validator ? { onChange: validator } : undefined}
    >
      {(field: any) => (
        <Input
          id={String(field.name)}
          label={label}
          type={type}
          placeholder={placeholder}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          error={field.state.meta.errors[0]}
          required={required}
          disabled={disabled}
        />
      )}
    </form.Field>
  );
}
