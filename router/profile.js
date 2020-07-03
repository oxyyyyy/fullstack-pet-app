const router = require("express").Router();

const profileController = require("../controllers/profile");

// * GET /profile/:id
router.get("/:id", profileController.getProfile);

// * PUT /profile/:id
router.put("/:id", profileController.editProfile);

module.exports = router;
