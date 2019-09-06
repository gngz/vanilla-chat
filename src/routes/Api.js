const express = require('express');
const usersRoute = require('./Api/Users');
const authRoute = require('./Api/Auth');
const router = express.Router();


router.use('/user', usersRoute);
router.use('/auth', authRoute);



router.get('/', (req,res) => {
    res.send("Vanilla Chat API ROOT")
})

module.exports = router;
