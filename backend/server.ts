import { createRequire } from "node:module";
import express from "express";
import { env } from "./env";
import feedbackRouter from "./routes/feedback.route";
import { sendSuccess } from "./utils/apiResponse";

const { version } = createRequire(import.meta.url)("./package.json") as {
    version: string;
};

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
    sendSuccess(res, { version });
});

app.use("/feedbacks", feedbackRouter);

app.listen(env.API_PORT, () => {
    console.log(`Server is running on port ${env.API_PORT}`);
});