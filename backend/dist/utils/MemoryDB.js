/**
 * @description MemoryDB é uma classe que simula um banco de dados em memória singleton compartilhado pelo processo Node.
 * @author Geovane Saraiva da Silva
 */
export class MemoryDB {
    static instance;
    feedbacks = [];
    constructor() { }
    static getInstance() {
        if (!MemoryDB.instance) {
            MemoryDB.instance = new MemoryDB();
        }
        return MemoryDB.instance;
    }
    add(feedback) {
        this.feedbacks.push(feedback);
    }
    list() {
        return this.feedbacks;
    }
    delete(feedback) {
        this.feedbacks = this.feedbacks.filter((f) => f.id !== feedback.id);
    }
}
export default MemoryDB.getInstance();
