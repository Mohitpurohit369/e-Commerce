const express = require("express");
const { createRole, getAllRoles } = require("../controllers/roleController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware(["manage_users"]), createRole);
router.get("/", authMiddleware, roleMiddleware(["manage_users"]), getAllRoles);

module.exports = router;
