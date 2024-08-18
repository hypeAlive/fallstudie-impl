import ServerUtil from "./util/ServerUtil.js";
import {router as apiRouter} from "./routes/api.js";

export const app = ServerUtil.createApp();

app.use("/api", apiRouter);

