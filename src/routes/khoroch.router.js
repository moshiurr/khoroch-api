const router = require('express').Router();
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth');
const ExpenseGroup = require('../models/expenseGroup');
const Expense = require('../models/expense');

//admin power for a expense group
// can create a expense group, add user, delete user, name/rename group, block user from a group

//TODO: route for creating a expense group
router.post('/create', authMiddleware, async (req, res)=>{
      const {members, groupName} = req.body;

      try {
            //checking if all the members are valid or not
            let areAllMembersActive = await ExpenseGroup.validateMembers(members);
            if(!areAllMembersActive) throw new Error("One of the member is not valid");

            // adding the user itself inside the members array
            members.push(req.user._id);
            
            const newExpenseGroupData = { admin: req.user._id, members, groupName};

            let expenseGroup = new ExpenseGroup(newExpenseGroupData);

            await expenseGroup.save();

            return res.send({
                  success: true,
                  message: "Expense group saved successfully"
            })
            
      } catch (error) {
            return res.status(500).send({
                  success: false,
                  message: error.message
            })
      }
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