import { ComponentPropsWithoutRef } from 'react'
import styles from './FormInput.module.css'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string
  error?: string
  required?: boolean
}

export default function FormInput(props: InputProps) {
  const { label, error, required, ...inputProps } = props

  return (
    <div className={styles.inputField}>
      <label className={styles.label}>{required ? label + '*' : label}</label>
      <input className={styles.input} {...inputProps} />
      {error && <p>Error Message: {error}</p>}
    </div>
  )
}
