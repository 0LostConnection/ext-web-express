import Feedback from "../models/Feedback";
import { randomUUID } from "crypto";
import MemoryDB from "../utils/MemoryDB";


/**
 * @description FeedbackRepository é uma classe que gerencia o repositório de feedbacks
 * @author Geovane Saraiva da Silva
 */
class FeedbackRepository {
    /**
     * @description Cria um novo feedback
     * @param userName - O nome do usuário que enviou o feedback
     * @param message - A mensagem do feedback
     * @returns O feedback criado
     */
    public static create(userName: string, message: string) {
        const feedback: Feedback = {
            id: randomUUID(),
            userName: userName,
            message: message,
            createdAt: new Date().toISOString(),
        };

        MemoryDB.add(feedback);

        return feedback;
    }

    /**
     * @description Lista todos os feedbacks
     * @returns Uma lista de feedbacks
     */
    public static list() {
        return MemoryDB.list();
    }

    /**
     * @description Deleta um feedback pelo ID
     * @param id - O ID do feedback
     * @returns O feedback deletado
     */
    public static delete(id: string) {
        const feedback = MemoryDB.list().find((f: Feedback) => f.id === id);

        if (!feedback) {
            throw new Error("Feedback não encontrado");
        }

        MemoryDB.delete(feedback);
    }

    /**
     * @description Encontra um feedback pelo ID
     * @param id - O ID do feedback
     * @returns O feedback encontrado
     */
    public static findById(id: string) {
        const feedback = MemoryDB.list().find((f: Feedback) => f.id === id);

        if (!feedback) {
            throw new Error("Feedback não encontrado");
        }

        return feedback;
    }
}

export default FeedbackRepository;