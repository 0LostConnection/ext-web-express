import Feedback from "../models/Feedback";

/**
 * @description MemoryDB é uma classe que simula um banco de dados em memória singleton compartilhado pelo processo Node.
 * @author Geovane Saraiva da Silva
 */
export class MemoryDB {
    private static instance: MemoryDB | undefined;
    private feedbacks: Feedback[] = [];

    private constructor() {}

    public static getInstance(): MemoryDB {
        if (!MemoryDB.instance) {
            MemoryDB.instance = new MemoryDB();
        }
        return MemoryDB.instance;
    }

    public add(feedback: Feedback): void {
        this.feedbacks.push(feedback);
    }

    public list(): Feedback[] {
        return this.feedbacks;
    }

    public delete(feedback: Feedback): void {
        this.feedbacks = this.feedbacks.filter((f) => f.id !== feedback.id);
    }
}

export default MemoryDB.getInstance();
