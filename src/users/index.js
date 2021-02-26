const express = require("express");
const { authenticate } = require("../auth");
const UserModel = require("../users/schema");

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res, next) => {
  try {
    const newUser = await UserModel(req.body);
    const { _id } = await newUser.save();
    res.status(201).send(_id);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await UserModel.findByCredentials(email, password);
    const accessToken = await authenticate(user);
    res.send({ accessToken: accessToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = usersRouter;
