const express = require("express");
const listEndpoints = require("express-list-endpoints");
const cors = require("cors");
const mongoose = require("mongoose");

//SERVER
const server = express();
const port = process.env.PORT || 3077;

//MIDDLEWARES
server.use(cors());
// server.use(express(json()));

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
