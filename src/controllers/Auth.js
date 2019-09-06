const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var hash = "ASVADASDASDDAD";


function  checkAuthentication(user, email, password) {
    
    let validEmail = user.email == email;
    let validPassword =  bcrypt.compare(password, user.password);
    return validEmail && validPassword;
}

function generateToken(user) {
    const token = jwt.sign({id: user.id}, hash,{
        expiresIn: '1d'
    })
    return token;
}

function Authenticated (req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader)
        return res.status(401).send({error: "No authentication token provided"});

    const [scheme, token] = authHeader.split(" ");

    if(scheme.toUpperCase() != "BEARER")
        return;


    jwt.verify(token, hash, (err, decoded) => {
        if(err) {
            res.status(401).json({error : "Invalid token"})
        }
        
        req.userId = decoded.id;
        next();
    })

}

module.exports = {
    checkAuthentication,
    generateToken,
    Authenticated
}