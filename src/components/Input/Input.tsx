'use client';

import { forwardRef, InputHTMLAttributes } from 'react'
import styles from './Input.module.css'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({id, label, error, helperText, className, required, ...rest}, ref) => {
    const inputClasses = [
      styles.input,
      error && styles.inputError,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          className={inputClasses}
          {...rest}
        />
        {error && (
          <span className={styles.error}>
            {error}
          </span>
        )}
        {helperText && !error && (
          <span className={styles.helperText}>
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
