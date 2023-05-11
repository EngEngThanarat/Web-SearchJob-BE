import express from "express";
import { getSearchByQuery } from "../Controllers/search.js";

const router = express.Router();

// GET
router.get("/", getSearchByQuery);

export default router;
