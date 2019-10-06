const express = require("express");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const app = express();

app.use(morgan('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

const PORT = process.env.PORT || 7000;


app.listen(PORT, console.log(`Server listening at ${PORT}`));

