const express = require("express");
const router = express.Router();
const userModel = require('../models/user');
const {validateBody, schemas} = require("../helpers/routeHelpers");


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
    await newUser.save()
        .then(user => {
            res.status(200).json({
                user: 'created',
                userInfo: user
            });
        });
}); 

//user login

router.post('/login',(req, res) => {

});

module.exports = router;