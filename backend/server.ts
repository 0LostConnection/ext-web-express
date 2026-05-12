import express from "express";
import { env } from "./env";
import feedbackRouter from "./routes/feedback.route";

const app = express();

app.use(express.json());
app.use("/feedback", feedbackRouter);

app.listen(env.API_PORT, () => {
    console.log(`Server is running on port ${env.API_PORT}`);
});