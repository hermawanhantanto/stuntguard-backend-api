import express from "express";
import { requireAuth } from "../../middleware/requireAuth.js";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTaskByIdHandler,
  getTaskHandler,
} from "../handler/taskHandler.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getTaskHandler);
router.get("/:id", getTaskByIdHandler);
router.post("/", createTaskHandler);
router.delete("/:id", deleteTaskHandler);

export default router;
