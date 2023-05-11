import express from "express";
import upload from "../middleware/upload.js";
import { getUsers, getUser, login, createUser, updateUser, deleteUser} from "../Controllers/users.js";

const router = express.Router();

// GET
router.get("/", getUsers);
router.get("/id", getUser);

// POST
router.post("/", createUser);
router.post("/login", login);

// PUT
router.put("/:Email", updateUser);

// DELETE
router.delete("/:Email", deleteUser);

export default router;