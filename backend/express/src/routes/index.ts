import {Router} from "express";
import {router as apiRputer} from "./api.js";

export const router = Router();

router.use("/api", apiRputer);