import express from "express";
import { getUrls, shortenUrl } from "../controllers/url.controller.js";

const router = express.Router();

router.post("/shorten", shortenUrl);
router.get("/urls", getUrls);

export default router;
