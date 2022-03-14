const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../utils/generateTokens");
const { verify } = require("../utils/authVerify");

// Register
router.post("/register", async (req, res) => {
    try{
        // generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const newUser = new User({
            email:     req.body.email,
            password:  hashedPassword,
        });
    
        // save user and return response
        const user = await newUser.save();
        res.status(200).json(user);

    }catch(err){
        res.status(500).json(err)
    }

});

// LOGIN
router.post("/login", async (req, res) => {
    try{
        // validate the req.body data
        const user = await User.findOne({email: req.body.email});
        if (!user){
            return res.status(400).send("User not found")
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword){
            return res.status(400).send("Wrong password")
        }

        //Generate an access token
        const accessToken = generateAccessToken({id: user._id, email: user.email});
        
        res.status(200).json({
            user: user,
            accessToken: accessToken,
        });

    }catch(err){
        res.status(500).json(err)
    }

})


// Logout
router.post("/logout", verify, async (req, res) => {
    try{
        const user = User.findOne({email: req.body.email})
        if(user){
            res.status(200).json("You logged out successfully.");
        }
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;