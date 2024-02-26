const express = require('express');
const router = express.Router();
const { loginUser, logoutUser  } = require('../controllers/userController');

router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", loginUser);

router.get("/logout", logoutUser);


module.exports = router;
