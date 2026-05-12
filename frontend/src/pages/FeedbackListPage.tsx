import { useEffect, useState } from "react";
import { listFeedbacks, removeFeedback } from "../api/feedbackApi";
import { formatApiMessage } from "../utils/apiErrors";
import type { Feedback } from "../types/feedback";
import { FeedbackCard } from "../components/feedback/FeedbackCard";
import styles from "./FeedbackListPage.module.css";

function applyListResult(
    result: Awaited<ReturnType<typeof listFeedbacks>>,
    setItems: (v: Feedback[] | null) => void,
    setLoadError: (v: string | null) => void,
) {
    if (result.ok) {
        setItems(result.data);
        setLoadError(null);
    } else {
        setItems(null);
        setLoadError(formatApiMessage(result.body));
    }
}

export function FeedbackListPage() {
    const [items, setItems] = useState<Feedback[] | null>(null);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [removingId, setRemovingId] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        void (async () => {
            const result = await listFeedbacks();
            if (cancelled) return;
            applyListResult(result, setItems, setLoadError);
        })();

        return () => {
            cancelled = true;
        };
    }, []);

    async function handleRemove(id: string) {
        setRemovingId(id);
        const result = await removeFeedback(id);
        setRemovingId(null);

        if (!result.ok) {
            setLoadError(formatApiMessage(result.body));
            return;
        }

        const listResult = await listFeedbacks();
        applyListResult(listResult, setItems, setLoadError);
    }

    return (
        <div className={styles.wrap}>
            <header className={styles.header}>
                <h1 className={styles.title}>Feedbacks recebidos</h1>
                <p className={styles.subtitle}>
                    Lista atualizada na ordem em que o servidor os guardou na memória.
                </p>
            </header>

            {loadError ? (
                <p className={styles.bannerError} role="alert">
                    {loadError}
                </p>
            ) : null}

            {items === null && !loadError ? (
                <p className={styles.state}>Carregando…</p>
            ) : null}

            {items && items.length === 0 ? (
                <p className={styles.empty}>
                    Nenhum feedback ainda. Envie o primeiro na página inicial.
                </p>
            ) : null}

            {items && items.length > 0 ? (
                <ul className={styles.list}>
                    {items.map((item) => (
                        <li key={item.id}>
                            <FeedbackCard
                                item={item}
                                onRemove={handleRemove}
                                removing={removingId === item.id}
                            />
                        </li>
                    ))}
                </ul>
            ) : null}
        </div>
    );
}
