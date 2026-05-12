import { UUID } from "crypto";

/**
 * @description Feedback é uma interface que representa um feedback
 * @author Geovane Saraiva da Silva
 */
interface Feedback {
    id: UUID;
    userName: string;
    message: string;
    createdAt: string;
}

export default Feedback;