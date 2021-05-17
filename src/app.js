


const express = require('express');
const app = express();
require("../db/conn.js");
const userRouter = require("./router.js");
const port = process.env.PORT || 8090;

//express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code
app.use(express.json());   // Without this value will not be saving in Db.
app.use(userRouter);


app.listen(port, () => {
    console.log(`Port Listening to ${port}`);
});



