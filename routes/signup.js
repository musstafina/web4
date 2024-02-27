

const express = require('express');
const router = express.Router();
const { signupUser } = require('../controllers/userController');

router.get("/", (req, res) => {
    res.render("signup");
});

router.post("/", signupUser);

module.exports = router;