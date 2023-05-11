import express from "express";
import upload from "../middleware/upload.js";
import { getRequitments, getRequitment, createRequitment, updateRequitment, deleteRequitment} from "../Controllers/company.js";

const router = express.Router();

// GET
router.get("/", getRequitments);
router.get("/name", getRequitment);

// POST
router.post("/", createRequitment);

// PUT
router.put("/:Business_Name", updateRequitment);

// DELETE
router.delete("/:Business_Name", deleteRequitment);

export default router;