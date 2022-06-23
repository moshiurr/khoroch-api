const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next){
      try{
            let token = req.header("Authorization").replace("Bearer ", "");
            let decoded = jwt.verify(token,process.env.JWT_SECRETE);
            const user = await User.findOne({_id: decoded._id, 'tokens.token':token});
            
            if(!user) throw new Error("Authorization failed.")
            req.user = user;
            req.token = token;
            next();

      }catch(err){
            console.log(err.message);
            return res.status(400).send({
                  success: false,
                  message: "Authorization failed. Authenticate yourself"
            })
      }
}