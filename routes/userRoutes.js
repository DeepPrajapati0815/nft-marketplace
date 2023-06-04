import {
  getAllUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
import { verify } from "../middlewares/verifySignature.js";
import express from "express";

const router = express.Router();

router.patch("/:account", verify, updateUser);

router.get("/:account", getSingleUser);

router.get("/", getAllUsers);
router.post("/", verify, createUser);
router.delete("/", verify, deleteUser);

export default router;
