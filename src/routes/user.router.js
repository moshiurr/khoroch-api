const router = require('express').Router();
const User = require('../models/user');
const authMiddleware = require('../middlewares/auth');

// this route for login
router.post('/login', async (req, res) => {
      const {email,password} = req.body;

      try {
            const user = await User.findByCredentials(email, password);
            const token = await user.generateAuthToken();
            return res.send({
                  success: true,
                  user: {name: user.firstName+" "+user.lastName, email: user.email, id: user._id},
                  token
            });
            
      } catch (error) {
            return res.status(412).send({
                  success: false,
                  message: error.message
            });
      }
      
});

//this route is for registering a new user
router.post('/register', async (req, res) => {
      const {firstName, lastName, email, password,username} = req.body;
      const newUserData = {firstName, lastName, email, password, username};
      const newUser = new User(newUserData);

      await newUser.save( async function (err) {
            if(err){
                  return res.status(412).send({
                        success: false,
                        message: err
                  })
            }
            let token = await newUser.generateAuthToken();
            return res.status(201).json({
                  success: true,
                  token: token,
                  message: "registration successful"
            });
      });



});

// for logging out
router.post('/logout', authMiddleware , async (req, res) => {
      try {
            req.user.tokens = req.user.tokens.filter(token=>{
                  return token.token !== req.token
            });

            await req.user.save();
            return res.send({
                  success: true,
                  message: "Logged out successfully"
            })
            
      } catch (error) {
            return res.status(400).send({
                  success: false,
                  message: error.message
            })
      }
})

//for logging out from everywhere
router.post('/logoutAll', authMiddleware , async (req, res) => {
      try {
            req.user.tokens = [];
            await req.user.save();

            return res.send({
                  success: true,
                  message: "Logged out from everywhere successfully"
            })

      } catch (error) {
            console.log(error.message);
            return res.status(400).send({
                  success: false,
                  message: error.message
            })
      }

});

module.exports = router;