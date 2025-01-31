const jwt = require('jsonwebtoken');

const verifyAuth = (req, res, cb) => {
    if(!req.headers.authorization) return res.status(401).json({message: 'please provoide a token'});
    const token = req.headers.authorization.split(' ')[1];
    console.log(req.headers.authorization);
    jwt.verify(token, process.env.JWT_KEY, (error, decode)=>{
        if(error) return res.status(401).json({message: 'invalid token'});

        console.log(decode);
        cb();
    })
    
}

module.exports = verifyAuth;