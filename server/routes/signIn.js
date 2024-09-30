const express = require("express");
const { signIn } = require("../controllers/usersController");

const router = express.Router();

// POST signIn
router.post("/", signIn);


module.exports = router;
