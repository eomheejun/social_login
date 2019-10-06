const express = require("express");
const router = express.Router();
const userModel = require('../models/user');
const jwt = require("jsonwebtoken");
const {validateBody, schemas} = require("../helpers/routeHelpers");
const passport = require("passport");
const passportConf = require('../passport');

signToken = user => {
    return jwt.sign({
        iss:'good',
        sub:user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getTime() + 1)
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

//현재유저정보 불러오기

router.get('/secret', passport.authenticate('jwt',{session:false}), (req, res) => {
    res.json({
        msg:"good"
    })
});

module.exports = router;