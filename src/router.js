const express = require('express');
const router = express.Router();
require("../db/conn.js");
const { User } = require("../models/student.js");


// Creating the registration of students
router.post("/student", (req, res) => {

    console.log(req.body);
    var StudentUsers = new User(req.body);

    //Here we cant use model name as save is not function of model,use save with variable which mean we can't use User.save()

    StudentUsers.save().then(() => {
        res.status(201).send("Inserted Sucessfully");
    }).catch((err) => {
        try {
            if (err.keyValue.email != null && err.name === "MongoError" && err.code === 11000) {
                res.status(400).send("Email must be unique");
                console.log("Email must be unique");
            } else if (err.keyValue.mobile != null && err.name === "MongoError" && err.code === 11000) {
                res.status(400).send("MobileNo. must be unique");
                console.log("MobileNo. must be unique");
            } else {
                res.status(400).send(err);
                console.log(err);
            }
        } catch (e) {
            console.log(e);
        }

    });


})

// Fetching All records of registered students
router.get("/student", async (req, res) => {
    try {
        var allUsers = await User.find();
        res.status(200).send(allUsers);
        console.log(allUsers);

    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})

// Fetching single record of registered student on basis of mobile
// router.get("/student/:mobile", async (req, res) => {
//     try {
//         const _mobile = req.params.mobile;
//         var singleUser = await User.find({mobile:_mobile});
//         res.status(200).send(singleUser);
//         console.log(singleUser);

//     } catch (err) {
//         res.status(400).send(err);
//         console.log(err);
//     }
// })

// Fetching single record of registered student on basis of name search
router.get("/student/:name", async (req, res) => {
    try {
        const namex = req.params.name;
        console.log(namex);
        var singleUser = await User.find({ name: { $regex: namex, $options: '-i' } }); //-i is for incase sensitives
        res.status(200).send(singleUser);
        console.log(singleUser);

    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})


//Updating single record of registered student on basis of mobile (Use put for partial update)
router.put("/student/:mobile", async (req, res) => {
    try {
        const mobile = req.params.mobile;

        var singleUser = await User.findOneAndUpdate({ mobile: mobile }, { $set: req.body }, { new: true });
        try {
            if (singleUser === null) {
                await res.status(400).send("User not exist with following mobile number");
            } else {
                res.status(200).send(singleUser);
                console.log(singleUser);
            }

        } catch (e) {
            console.log(e);

        }
    } catch (err) {
        try {
            if (err.keyValue.email != null && err.name === "MongoError" && err.code === 11000) {
                res.status(400).send("Email must be unique");
                console.log("Email must be unique");
            } else if (err.keyValue.mobile != null && err.name === "MongoError" && err.code === 11000) {
                res.status(400).send("MobileNo. must be unique");
                console.log("MobileNo. must be unique");
            } else {
                res.status(400).send(err);
                console.log(err);
            }
        } catch (e) {
            res.status(400).send(e);
            console.log(e);
        }
    }
})
//Deleting single record of registered student on basis of mobile
router.delete("/student/:mobile", async (req, res) => {
    try {
        const mobile = req.params.mobile;
        var singleUser = await User.deleteOne({ mobile: mobile }, { new: true });
        try {
            if (singleUser === null) {
                await res.status(400).send("User not exist with following mobile number");
            } else {
                res.status(200).send(singleUser);
                console.log(singleUser);
            }

        } catch (e) {
            console.log(e);

        }

    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})

module.exports = router;