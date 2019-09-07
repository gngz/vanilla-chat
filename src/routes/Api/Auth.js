const express = require('express');
const router = express.Router();
const AuthController = require ('../../controllers/Auth');
const UserController = require ('../../controllers/Users');


router.use(express.urlencoded({ extended: false }));

router.get('/', function (req,res) {
    res.send("hello");

});


/*
    Route /api/auth
    Method POST
    Authenticate the user responding with a jwt token or a json error menssage
*/

router.post('/', async (req,res) => {
    const {email , password} = req.body;
    
    //  TO DO: validate email
    let user  =  await UserController.getByEmail(email);

    if(!user) {
        res.status(400).json({error : "No account found with this e-mail address"});
    } else {
        if(await AuthController.checkAuthentication(user, email,password)) {
            user.password = undefined;
            user.__v = undefined;
            let token = AuthController.generateToken(user);
            res.send( {user , token });
        } else {
            res.status(401).json({error : "Invalid credentials"});
        }
    }
         
})

module.exports = router;