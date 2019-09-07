const express = require('express');
const router = express.Router();
const UserController = require ('../../controllers/Users');
const AuthController = require('../../controllers/Auth')

router.use(express.urlencoded({ extended: false }));

/*
    Route /api/user
    Method GET
    Get current user information
*/

router.get('/',AuthController.Authenticated, async (req,res) => {

    let user = await UserController.getById(req.userId);
    user.password = undefined;  // removing password field
    res.json(user); // send user in json format (200)

});



/*
    Route /api/user
    Method POST
    Register a new user
*/

router.post('/', async (req,res) => {
    

    let {username, password, profilepic, email} = req.body;
    
    // TO DO: Validations


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