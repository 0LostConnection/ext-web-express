import Feedback from "../models/Feedback";

/**
 * @description MemoryDB é uma classe que simula um banco de dados em memória
 * @author Geovane Saraiva da Silva
 */
class MemoryDB {
    private static feedbacks: Feedback[] = [];

    public static add(feedback: Feedback): void {
        this.feedbacks.push(feedback);
    }

    public static list(): Feedback[] {
        return this.feedbacks;
    }

    public static delete(feedback: Feedback): void {
        this.feedbacks = this.feedbacks.filter(f => f.id !== feedback.id);
    }
}

export default MemoryDB;