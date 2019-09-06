const express = require('express');
const router = express.Router();
const AuthController = require ('../../controllers/Auth');
const UserController = require ('../../controllers/Users');


router.use(express.urlencoded({ extended: false }));

router.get('/', function (req,res) {
    res.send("hello");

});


router.post('/', async (req,res) => {
    const {email , password} = req.body;
    
    // validate email
    let user  =  await UserController.getByEmail(email);

    if(AuthController.checkAuthentication(user, email,password)) {
            user.password = undefined;
            let token = AuthController.generateToken(user);
            res.send( {user , token });
    } else {
         res.status(400).json({error : "not authenticated"});
    }

})

module.exports = router;