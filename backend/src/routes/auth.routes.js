import express from "express";

import {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

import { verifyToken } from "../middlewares/verify.middleware.js";

const router = express.Router();

// Register
router.post("/signup", signup);

// Login
router.post("/login", login);

// Logout
router.post("/logout", verifyToken, logout);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.post("/reset-password/:token", resetPassword);

export default router;