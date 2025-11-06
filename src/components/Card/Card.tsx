import { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  radius?: 'sm' | 'md' | 'lg' | 'xl';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export default function Card({
  variant = 'default',
  radius = 'md',
  padding = 'md',
  children,
  className = '',
  ...props
}: Readonly<CardProps>) {
  const classes = [
    styles.card,
    styles[variant],
    styles[`radius-${radius}`],
    styles[`padding-${padding}`],
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
