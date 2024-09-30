// routes/signUp.js
const express = require("express");
const { signUp } = require("../controllers/usersController");  // ייבוא פונקציית signUp מהבקר

const router = express.Router();

// POST signUp
router.post("/", signUp);  // הגדרת נתיב POST לרישום משתמשים

module.exports = router;
