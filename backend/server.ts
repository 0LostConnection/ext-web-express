import express from "express";
import { env } from "./env";

const app = express();

app.use(express.json());

app.listen(env.API_PORT, () => {
    console.log(`Server is running on port ${env.API_PORT}`);
});