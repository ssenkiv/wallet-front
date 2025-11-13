export const accountValidators = {
  firstName: ({ value }: { value: string }) =>
    value.trim() ? undefined : 'First name is required',

  lastName: ({ value }: { value: string }) =>
    value.trim() ? undefined : 'Last name is required',

  email: ({ value }: { value: string }) => {
    if (!value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return 'Please enter a valid email address';
    return undefined;
  },

  password: ({ value }: { value: string }) => {
    if (!value.trim()) return 'Password is required';
    if (value.length < 6) return 'Password must be at least 6 characters';
    return undefined;
  },
} as const;
