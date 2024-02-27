const express = require('express');
const router = express.Router();
const { loginUser, logoutUser  } = require('../controllers/userController');
const { requireAuth } = require('../middleware/authMiddleware');


router.get("/", (req, res) => {
    res.render("login");
});

router.post("/", loginUser);

router.get("/logout", requireAuth, logoutUser);


module.exports = router;
