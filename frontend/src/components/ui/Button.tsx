import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "cta" | "secondary" | "dangerGhost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
};

export function Button({
    variant = "primary",
    className = "",
    type = "button",
    ...rest
}: Props) {
    const variantClass =
        variant === "cta"
            ? styles.cta
            : variant === "secondary"
              ? styles.secondary
              : variant === "dangerGhost"
                ? styles.dangerGhost
                : styles.primary;

    return (
        <button
            type={type}
            className={`${styles.root} ${variantClass} ${className}`.trim()}
            {...rest}
        />
    );
}
