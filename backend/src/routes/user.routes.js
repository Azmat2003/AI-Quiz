import express from "express";

import {
  getProfile,
  updateProfile,
  changePassword
} from "../controllers/user.controller.js";

import { verifyToken } from "../middlewares/verify.middleware.js";

const router = express.Router();

// Get logged-in user's profile
router.get(
  "/profile",
  verifyToken,
  getProfile
);

// Update name / basic profile data
router.put(
  "/profile",
  verifyToken,
  updateProfile
);

// Change password
router.put(
  "/change-password",
  verifyToken,
  changePassword
);

// Upload profile picture
// router.post(
//   "/profile-picture",
//   verifyToken,
//   upload.single("file"),
//   uploadProfilePicture
// );

export default router;