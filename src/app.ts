import express from "express";
import cors from "cors";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler";
import ebarimtRouter from "./routes/ebarimt.router";

const app = express();

app.use(express.json());

const whitelist = [
    "http://172.30.30.40:3000",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://172.30.30.35:3000",
    "http://172.30.30.44:3000",
    "http://172.30.30.36:3000",
    "http://172.30.30.40:3000",
    "http://192.168.1.5:3000",
    "http://172.16.11.6:3000",
].filter(Boolean);

const corsOptions = {
    origin: function (
        origin: string | undefined,
        callback: (err: Error | null, allow?: boolean) => void,
    ) {
        const isAllowed =
            !origin ||
            whitelist.includes(origin) ||
            /^http:\/\/(192\.168|10\.|172\.(1[6-9]|2[0-9]|3[0-1]))(\.\d{1,3}){2}:\d+$/.test(
                origin,
            );

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error("❌ Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type", "Accept"],
};

app.use(cors(corsOptions));
app.use(
    helmet({
        crossOriginResourcePolicy: false,
    }),
);

app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/ebarimt", ebarimtRouter);

app.use(errorHandler);

export default app;
