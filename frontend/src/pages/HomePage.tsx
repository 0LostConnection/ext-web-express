import type { FormEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendFeedback } from "../api/feedbackApi";
import {
    extractFeedbackFieldErrors,
    formatApiMessage,
} from "../utils/apiErrors";
import { Button } from "../components/ui/Button";
import { TextArea } from "../components/ui/TextArea";
import { TextField } from "../components/ui/TextField";
import styles from "./HomePage.module.css";

export function HomePage() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{
        userName?: string;
        message?: string;
    }>({});

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        setFormError(null);
        setFieldErrors({});
        setSubmitting(true);

        const result = await sendFeedback({
            userName,
            message,
        });

        setSubmitting(false);

        if (result.ok) {
            navigate("/feedbacks/lista");
            return;
        }

        const fields = extractFeedbackFieldErrors(result.body);
        setFieldErrors(fields);
        const hasField = Object.keys(fields).length > 0;
        setFormError(hasField ? null : formatApiMessage(result.body));
    }

    return (
        <div className={styles.wrap}>
            <section className={styles.hero}>
                <p className={styles.kicker}>Sua opinião importa</p>
                <h1 className={styles.title}>Envie seu feedback</h1>
                <p className={styles.lead}>
                    Conte como está sendo sua experiência no curso. Nome e mensagem
                    são armazenados só na memória do servidor enquanto ele está em
                    execução.
                </p>
            </section>

            <form className={styles.card} onSubmit={onSubmit} noValidate>
                <TextField
                    id="userName"
                    name="userName"
                    label="Nome"
                    autoComplete="name"
                    value={userName}
                    onChange={(ev) => setUserName(ev.target.value)}
                    error={fieldErrors.userName}
                    required
                />
                <TextArea
                    id="message"
                    name="message"
                    label="Comentário"
                    value={message}
                    onChange={(ev) => setMessage(ev.target.value)}
                    error={fieldErrors.message}
                    required
                />

                {formError ? (
                    <p className={styles.bannerError} role="alert">
                        {formError}
                    </p>
                ) : null}

                <div className={styles.actions}>
                    <Button type="submit" variant="cta" disabled={submitting}>
                        {submitting ? "Enviando…" : "Enviar feedback"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
