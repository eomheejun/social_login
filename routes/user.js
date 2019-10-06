const express = require("express");
const router = express.Router();
const userModel = require('../models/user');
const jwt = require("jsonwebtoken");
const {validateBody, schemas} = require("../helpers/routeHelpers");

signToken = user => {
    return jwt.sign({
        iss:'good',
        sub:user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getTime()+1)
    }, process.env.SECRET);
}


router.get('/', (req, res) => {
    res.json({
        msg:"good"
    });
});


// user signup
router.post('/signup', validateBody(schemas.authSchema), async (req, res) => {

    const{username, email, password} = req.value.body;

    const foundUser = await userModel.findOne({email});
    if (foundUser) {
        return res.status(403).json({
            error: 'email is already is use'
        });
    }

    const newUser = new userModel({ username, email, password });
    const token = signToken(newUser);
    await newUser.save()
        .then(user => {
            res.status(200).json({
                user: 'created',
                userInfo: user,
                tokenInfo: 'bearer ' + token
            });
        });
    }); 

//user login

router.post('/login',(req, res) => {

});

module.exports = router;