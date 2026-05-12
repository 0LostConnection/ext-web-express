import type { InputHTMLAttributes } from "react";
import styles from "./TextField.module.css";

type Props = InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: string;
    id: string;
};

export function TextField({ label, error, id, className = "", ...rest }: Props) {
    return (
        <div className={styles.wrap}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <input
                id={id}
                className={`${styles.input} ${error ? styles.inputError : ""} ${className}`.trim()}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                {...rest}
            />
            {error ? (
                <p id={`${id}-error`} className={styles.error} role="alert">
                    {error}
                </p>
            ) : null}
        </div>
    );
}
