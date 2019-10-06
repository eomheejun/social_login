const express = require("express");
const router = express.Router();
const {validateBody, schemas} = require("../helpers/routeHelpers");


router.get('/', (req, res) => {
    res.json({
        msg:"good"
    });
});


// user signup
router.post('/signup', validateBody(schemas.authSchema), (req, res) => {
    console.log(req.value.body);

});

//user login

router.post('/login',(req, res) => {

});

module.exports = router;