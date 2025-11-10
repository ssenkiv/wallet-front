'use client';

import { useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: Readonly<ModalProps>) {
  useEffect(() => {
    if (isOpen) {
      // Get scrollbar width to prevent layout shift
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const modalContent = (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${styles.modal} ${styles[`size-${size}`]}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        <div className={styles.header}>
          {title && (
            <h2 id="modal-title" className={styles.title}>
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
