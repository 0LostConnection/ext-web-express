import express from "express";
import { env } from "./env";
import feedbackRouter from "./routes/feedback.route";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({ "version": "1.0.0" });
});

app.use("/feedbacks", feedbackRouter);

app.listen(env.API_PORT, () => {
    console.log(`Server is running on port ${env.API_PORT}`);
});