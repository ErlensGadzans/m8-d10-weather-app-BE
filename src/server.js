const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const mongoose = require("mongoose");
const weatherApiRouter = require("../src/weather/index");
const usersRouter = require("../src/users/index");
const oauth = require("../src/auth/oauth"); // ATTACHING GOOGLE STRATEGY TO PASSPORT
const passport = require("passport");

//SERVER
const server = express();
const port = process.env.PORT || 3077;

const {
  notFoundHandler,
  forbiddenHandler,
  badRequestHandler,
  genericErrorHandler,
} = require("../errorHandlers");

//MIDDLEWARES
server.use(cors());
server.use(express.json());
server.use("/weather", weatherApiRouter);
server.use("/users", usersRouter);
server.use(passport.initialize()); //INITIALIZE PASSPORT

// ERROR HANDLERS MIDDLEWARES
server.use(badRequestHandler);
server.use(forbiddenHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);
//
console.log(listEndpoints(server));

mongoose
  .connect(process.env.MONGO_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(port, () => {
      console.log("This server is running on port", port);
    })
  )
  .catch((error) => console.log(error));
