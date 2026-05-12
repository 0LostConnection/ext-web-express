import type { TextareaHTMLAttributes } from "react";
import styles from "./TextArea.module.css";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    error?: string;
    id: string;
};

export function TextArea({ label, error, id, className = "", ...rest }: Props) {
    return (
        <div className={styles.wrap}>
            <label className={styles.label} htmlFor={id}>
                {label}
            </label>
            <textarea
                id={id}
                className={`${styles.input} ${error ? styles.inputError : ""} ${className}`.trim()}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? `${id}-error` : undefined}
                rows={5}
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
