import { createRequire } from "node:module";
import cors from "cors";
import express from "express";
import { corsAllowedOrigins, env } from "./env";
import feedbackRouter from "./routes/feedback.route";
import { sendSuccess } from "./utils/apiResponse";

const { version } = createRequire(import.meta.url)("./package.json") as {
    version: string;
};

const app = express();

app.use(
    cors({
        origin: corsAllowedOrigins(),
        methods: ["GET", "POST", "OPTIONS", "HEAD"],
        allowedHeaders: ["Content-Type", "Accept"],
    }),
);
app.use(express.json());

app.get("/", (_req, res) => {
    sendSuccess(res, { version });
});

app.use("/feedbacks", feedbackRouter);

app.listen(env.API_PORT, () => {
    console.log(`Server is running on port ${env.API_PORT}`);
});