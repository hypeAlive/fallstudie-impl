import express from "express";
import cors from "cors";
import helmet from "helmet";
import {LOGGER} from "../main.js";

export default class {

    static generatePort(): number {
        const port = Number(process.env.PORT || 8080);
        if(isNaN(port)) throw new Error('Error while generating port');
        return port;
    }

    static createApp(port: number = this.generatePort()) {
        const app = express();

        // SetUp
        app.use(helmet());

        app.set('case sensitive routing', false);
        app.set('view engine', 'ejs');
        app.set('trust proxy', 1);

        // Middleware
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());
        app.use(cors({ origin: ['http://localhost:8080', 'http://localhost:4200' ] }));
        app.options('*', cors());

        app.use((req, res, next) => {
            req.headers['x-request-ip'] = req.headers['x-real-ip'];
            next();
        })


        app.listen(port, () => {
            LOGGER.info(`Server started on port ${port}`);
        });


        return app;
    }

}