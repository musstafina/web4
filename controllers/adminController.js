const bcrypt = require('bcrypt');
const User = require('../models/users');
const Item = require('../models/item');

const saltRounds = 10; 

function generateUserID() {
    return Math.random().toString(36).substr(2, 9); 
}


async function createAdmin() {
    try {
        const existingAdmin = await User.findOne({ username: "Nargiz" });
        if (!existingAdmin) {
            const userId = generateUserID(); 
            const hashedPassword = await bcrypt.hash("microlab", saltRounds); 
            const adminUser = new User({
                userId,
                name: "Nargiz",
                username: "Nargiz",
                password: hashedPassword,
                role: 'admin'
            });
            await adminUser.save();
        }
    } catch (error) {
        console.error("Error creating admin:", error);
    }
}

async function renderAdminPanel(req, res) {
    try {
        if (!req.session.user || !req.session.user.role === 'admin') {
            return res.status(403).send("Forbidden: Only admins can access this page.");
        }
        const users = await User.find();
        const items = await Item.find();

        res.render("admin", { users, items });
    } catch (error) {
        console.error("Error rendering admin panel:", error);
        res.status(500).send("An error occurred while rendering admin panel.");
    }
}

async function addUser(req, res) {
    const {username, password } = req.body;
    try {
        if (!req.session.user || !req.session.user.role === 'admin') {
            return res.status(403).send("Forbidden: Only admins can add users.");
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds); 
        const newUser = new User({
            name: username,
            username,
            password: hashedPassword,
            userId:generateUserID(),
            role: 'user'

        });
        await newUser.save();
        res.redirect('/admin');
    } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send("An error occurred while adding user.");
    }
}
async function editUserForm(req, res) {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }
        if (!req.session.user || !req.session.user.role === 'admin') {
            return res.status(403).send("Forbidden: Only admins can edit users.");
        }
        res.render("edit-user", { user });
    } catch (error) {
        console.error("Error rendering edit user form:", error);
        res.status(500).send("An error occurred while rendering edit user form.");
    }
}

async function editUser(req, res) {
    const userId = req.params.userId;
    const { username, password } = req.body;
    try {
        if (!req.session.user || !req.session.user.role === 'admin') {
            return res.status(403).send("Forbidden: Only admins can edit users.");
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds); 
        await User.findByIdAndUpdate(userId, { username, password: hashedPassword });
        res.redirect('/admin');
    } catch (error) {
        console.error("Error editing user:", error);
        res.status(500).send("An error occurred while editing user.");
    }
}

async function deleteUser(req, res) {
    const userId = req.params.userId;
    try {
        if (!req.session.user || !req.session.user.role === 'admin') {
            return res.status(403).send("Forbidden: Only admins can delete users.");
        }
        await User.findByIdAndDelete(userId);
        res.redirect('/admin');
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("An error occurred while deleting user.");
    }
}

async function addItem(req, res) {
    try {
        if (!req.session.user || req.session.user.role !== 'admin') {
            return res.status(403).send("Forbidden: Only admins can add items.");
        }
        const { itemNameEn, itemNameLocalized, itemDescriptionEn, itemDescriptionLocalized, image1, image2, image3 } = req.body;

        const newItem = new Item({
            itemNameEn,
            itemNameLocalized,
            itemDescriptionEn,
            itemDescriptionLocalized,
            image1,
            image2,
            image3
        });

        await newItem.save();

        res.redirect('/admin');
    } catch (error) {
        console.error('Error adding item:', error);
        res.status(500).send('Internal Server Error');
    }
}


async function editItem(req, res) {
    try {
        if (!req.session.user || req.session.user.role !== 'admin') {
            return res.status(403).send("Forbidden: Only admins can edit items.");
        }
        const itemId = req.params.itemId;
        const { itemNameEn, itemNameLocalized, itemDescriptionEn, itemDescriptionLocalized, image1, image2, image3 } = req.body;

        const updatedItem = await Item.findByIdAndUpdate(itemId, {
            itemNameEn,
            itemNameLocalized,
            itemDescriptionEn,
            itemDescriptionLocalized,
            image1,
            image2,
            image3
        }, { new: true }); 

        
        res.redirect('/admin');
    } catch (error) {
        console.error('Error editing item:', error);
        res.status(500).send('Internal Server Error');
    }
}



async function deleteItem(req, res) {
    try {
        if (!req.session.user || req.session.user.role !== 'admin') {
            return res.status(403).send("Forbidden: Only admins can delete items.");
        }
        const itemId = req.params.itemId;

        await Item.findByIdAndDelete(itemId);

        res.redirect('/admin');
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).send('Internal Server Error');
    }
}



module.exports = {
    createAdmin,
    renderAdminPanel,
    addUser,
    editUserForm,
    editUser,
    deleteUser,
    addItem,
    editItem,
    deleteItem
};


