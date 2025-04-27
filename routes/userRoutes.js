// import the express library
const express = require("express");
const { register, login, logout, me } = require("../controllers/userController");
const { isAuthenticated } = require("../middlewares/auth");

// create a router
const userRouter = express.Router();

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.post("/logout",isAuthenticated, logout)
userRouter.get("/me", isAuthenticated, me)

// export the router
module.exports = userRouter;