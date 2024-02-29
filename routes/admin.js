const express = require('express');
const router = express.Router();


const { renderAdminPanel, addUser, editUserForm, editUser, deleteUser, addItem, editItem, deleteItem } = require('../controllers/adminController'); 

router.get('/', renderAdminPanel);

router.post('/add-user', addUser);

router.get('/edit-user/:userId',  editUserForm);
router.post('/edit-user/:userId',  editUser);

router.post('/delete-user/:userId',  deleteUser);

router.post('/addItem', addItem);
router.post('/edit-item/:itemId', editItem);
router.post('/delete-item/:itemId', deleteItem);


module.exports = router;
