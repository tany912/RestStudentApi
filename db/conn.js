const mongoose = require('mongoose');

//Connecting Database with Promise
// mongoose.connect('mongodb://localhost:27017/StudentApi', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
// .then(() => { console.log("Connection successfull 123..") })
//     .catch((err) => { console.log(err) });


//Connecting Database with Async/Await

async function connect(){
    try {
     await mongoose.connect('mongodb://localhost:27017/StudentApi', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true,useFindAndModify : false })
        console.log("Connected");
    } catch (err) {
        console.log(err);
    }

}

connect();











