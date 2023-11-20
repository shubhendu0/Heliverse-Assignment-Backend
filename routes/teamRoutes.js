const express = require("express");
const router = express.Router();
const {
    createTeam,
    getTeams,
    getTeam
} = require("../controllers/teamController");

router.post("/", createTeam);
router.get("/", getTeams);
router.get("/:id", getTeam);

module.exports = router;