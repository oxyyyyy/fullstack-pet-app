import { Router } from "express";

import { getProfile, editProfile } from "./../controllers/profile";

const router = Router();

// * GET /profile/:id
router.get("/:id", getProfile);

// * PUT /profile/:id
router.put("/:id", editProfile);

export default router;
