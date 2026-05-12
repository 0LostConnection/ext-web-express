import type { Feedback } from "../../types/feedback";
import { Button } from "../ui/Button";
import styles from "./FeedbackCard.module.css";

type Props = {
    item: Feedback;
    onRemove: (id: string) => void;
    removing: boolean;
};

export function FeedbackCard({ item, onRemove, removing }: Props) {
    const created = new Date(item.createdAt);
    const dateLabel = Number.isNaN(created.getTime())
        ? ""
        : created.toLocaleString("pt-BR", {
              dateStyle: "short",
              timeStyle: "short",
          });

    return (
        <article className={styles.card}>
            <div className={styles.top}>
                <div>
                    <h2 className={styles.name}>{item.userName}</h2>
                    {dateLabel ? (
                        <p className={styles.meta}>{dateLabel}</p>
                    ) : null}
                </div>
                <Button
                    type="button"
                    variant="dangerGhost"
                    disabled={removing}
                    onClick={() => onRemove(item.id)}
                >
                    Remover
                </Button>
            </div>
            <p className={styles.message}>{item.message}</p>
        </article>
    );
}
