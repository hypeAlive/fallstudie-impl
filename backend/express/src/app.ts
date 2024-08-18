import winston from "winston";
import ServerUtil from "./util/ServerUtil.js";

export const LOGGER = winston.createLogger({
   level: 'info',
   format: winston.format.json(),
   transports: [
      new winston.transports.Console(),
   ]
});

ServerUtil.createApp();