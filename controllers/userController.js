const bcrypt = require('bcrypt');
const User = require('../models/users');

async function signupUser(req, res, next) {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.send('Username already exists. Please choose a different username.');
        }

        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name: username,
            username,
            password: hashedPassword,
            userId: generateUserID(), 
            creationDate: new Date(),
            role: 'user'

        });

        await newUser.save();

        res.redirect("/"); 
    } catch (error) {
        if (error.code === 11000) { 
            return res.send('Username is already taken. Please choose a different username.');
        }
        console.error("Error creating user:", error);
        res.status(500).send("An error occurred while creating user.");
    }
}

function generateUserID() {
    return Math.random().toString(36).substr(2, 9); 
}


async function loginUser(req, res, next) {
    try {
        const user = await User.findOne({ name: req.body.username });
        if (!user) {
            res.send("User name cannot found");
        } else {
            const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
            if (!isPasswordMatch) {
                res.send("Wrong password");
            } else {
                req.session.user = {
                    _id: user._id,
                    username: user.username,
                    role: user.role 
                };
                
                if (user.role === 'admin') {
                    res.redirect("/admin"); 
                } else {
                    res.redirect("/home"); 
                }       
            }
        }
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("An error occurred during login.");
    }
};

async function logoutUser(req, res, next) {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session:", err);
                res.status(500).send("An error occurred during logout.");
            } else {
                res.redirect("/");
            }
        });
    } catch (error) {
        console.error("Error during logout:", error);
        res.status(500).send("An error occurred during logout.");
    }
}

module.exports = {
    signupUser,
    loginUser,
    logoutUser
};
