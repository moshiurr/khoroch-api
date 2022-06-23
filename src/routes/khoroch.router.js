const router = require('express').Router();
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth');

//admin power for a expense group
// can create a expense group, add user, delete user, name/rename group, block user from a group

//TODO: route for creating a expense group
router.post('/create', authMiddleware, async (req, res)=>{

});

//TODO: route getting a expense group information
router.get('/:khorochId', authMiddleware, async (req, res)=>{

});

//TODO: route for adding user to a existing expense group
router.post('/add-user/', authMiddleware, async (req, res)=>{

});


//TODO: route for deleting user from a existing expense group
router.post('/delete-user', authMiddleware, async (req, res)=>{

});


//TODO: route for updating group information like (name, image if any) of a existing expense group
router.post('/update', authMiddleware, async (req, res)=>{

});




module.exports = router;