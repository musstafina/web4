const express = require('express');
const router = express.Router();


const { renderAdminPanel, addUser, editUserForm, editUser, deleteUser } = require('../controllers/adminController'); 

router.get('/', renderAdminPanel);

router.post('/add-user', addUser);

router.get('/edit-user/:userId',  editUserForm);
router.post('/edit-user/:userId',  editUser);

router.post('/delete-user/:userId',  deleteUser);

module.exports = router;
