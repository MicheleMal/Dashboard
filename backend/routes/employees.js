import express from "express";
import { authenticateToken } from "../middlewares/auth.js";
import {
    deleteEmployee,
    getAllEmployee,
    getInformationUser,
    modifyEmployee,
} from "../controllers/employees.js";

const router = express.Router();

// router.get("/all", authenticateToken, getAllEmployee);
router.get("/all", getAllEmployee);

router.get("/profile", authenticateToken, getInformationUser);

// router.patch("/modify/:id", authenticateToken, modifyEmployee);
router.patch("/modify/:id", modifyEmployee);

// router.delete("/delete/:id", authenticateToken, deleteEmployee);
router.delete("/delete/:id", deleteEmployee);

export default router;
