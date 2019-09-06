const User = require("../models/Users");
const bcrypt = require('bcrypt');

async function register(username, password, email, profilepic) {
    password = await bcrypt.hash(password, 10);
    
    let doc = {
        username,
        password,
        profilepic,
        email
    }

   return User.create(doc)

        
    
  
}

 async function getByEmail(email){
    //console.log(User.findOne({email})) 

    return User.findOne({email})
}

async function getById(id){
    //console.log(User.findOne({email})) 

    return User.findOne({"_id":id})
}

module.exports = {
    register,
    getByEmail,
    getById,
}