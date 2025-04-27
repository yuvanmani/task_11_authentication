// create a contoller object
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");

const userController = {
    register: async (req, res) => {
        try {
            // get the details from the request body
            const { name, email, password } = req.body;

            // check if the user already exists
            const user = await User.findOne({ email });

            if (user) {
                return res.status(500).json({
                    message: "User already exists"
                })
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            // create a new user model object
            const newUser = new User({
                name,
                email,
                password: hashedPassword
            })

            // save to the database
            await newUser.save();


            res.status(201).json({
                message: "User Registered successfully"
            })
        } catch (error) {
            res.status(500).json({
                message: "Registration Failed"
            })
        }
    },
    login: async (req, res) => {
        try {
            // get the data from the user req body
            const { email, password } = req.body;

            // check the user alrady exists
            const user = await User.findOne({ email });
            // user is an whole object of an user in database

            if (!user) {
                return res.status(401).json({
                    message: "Invalid email"
                })
            }

            // check the password is correct or not
            const isMatch = await bcrypt.compare(password, user.password);

            // isMatch either true or false
            if (!isMatch) {
                return res.status(401).json({
                    message: "Invalid password"
                })
            }

            // create a token for the user
            const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });

            // send a response to the client
            res.status(200).json({
                message: "Login successful", token
            })
        } catch (error) {
            res.status(500).json({
                message: "Login Failed"
            })
        }
    },
    logout: async (req, res) => {
        try {
            res.status(201).json({
                message: "Logout success"
            })
        } catch (error) {
            res.status(500).json({
                message: "Logout Failed"
            })
        }
    },
    me: async (req, res) => {
        try {
            // get the userId to search for data in the database
            const userId = req.userId;

            // find the user in the database
            const user = await User.findById(userId).select("-password -__v -createdAt -updatedAt");

            // check if the user exists
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                })
            }

            res.status(201).json({
                message: "User profile retrieved", user
            })
        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve user profile"
            })
        }
    }
}

module.exports = userController;