const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));


mongoose.connect(process.env.MONGO_URI, 
    {
        useNewUrlParser:true, 
        useCreateIndex:true, 
        useUnifiedTopology:true
    })
    .then(() => console.log("mongodb connected .. "))
    .catch(err => console.log(err));


app.use("/user", userRoute);





const PORT = process.env.PORT || 7000;


app.listen(PORT, console.log(`Server listening at ${PORT}`));

