import express from 'express';
import winston from "winston";
import helmet from "helmet";
import cors from "cors";
import {router as indexRouter } from "./routes/index.js";

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console(),
    ]
});

export const app = express();

app.set('case sensitive routing', false);
app.set('trust proxy', 1);


app.use(helmet());
app.use(express.json());
app.use(cors({ origin: ['http://localhost:8080', 'http://localhost:4200' ] }));
app.options('*', cors());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

app.listen(8080, () => {
   logger.info('Server is running on port 8080');
});