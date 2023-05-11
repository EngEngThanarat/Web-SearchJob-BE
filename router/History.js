import express from "express";
import { getcheckapplicants, getcheckapplicant, createApplicant, updateCheckapplicants, deleteCheckapplicant } from "../Controllers/History.js";

const router = express.Router();

// GET
router.get("/", getcheckapplicants);
router.get("/id", getcheckapplicant);

// POST
router.post("/", createApplicant);

// PUT
router.put("/:id", updateCheckapplicants);

// DELETE
router.delete("/:id", deleteCheckapplicant);

export default router;