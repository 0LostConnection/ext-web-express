import FeedbackRepository from "../repository/FeedbackRepository";

class FeedbackService {
    public static async send(userName: string, message: string) {
        return FeedbackRepository.create(userName, message);
    }

    public static async list() {
        return FeedbackRepository.list();
    }

    public static async delete(id: string) {
        return FeedbackRepository.delete(id);
    }

    public static async findById(id: string) {
        return FeedbackRepository.findById(id);
    }
}

export default FeedbackService;