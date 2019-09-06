const express = require('express');
const router = express.Router();
const UserController = require ('../../controllers/Users');
const AuthController = require('../../controllers/Auth')

router.use(express.urlencoded({ extended: false }));



router.get('/',AuthController.Authenticated, async (req,res) => {

    let user = await UserController.getById(req.userId);
    user.password = undefined;

    res.json(user);

});



router.post('/', async (req,res) => {
    
    let username = req.body.username;
    let password = req.body.password;
    let profilepic = null;
    let email = req.body.email;


    try {
        if(await UserController.getByEmail(email)) 
            return res.status(400).json({error : "User already exists"});

        let user = await UserController.register(username,password,email,profilepic);
        let token = AuthController.generateToken(user);
        user.password = undefined;
        res.json({user, token});
    } catch (err) {
        res.status(400).json({error : "Registration failed"});
    }

});



module.exports = router;