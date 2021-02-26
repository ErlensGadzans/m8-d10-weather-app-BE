const { verifyJWT } = require("../auth/index");
const UserModel = require("../users/schema");

const authorize = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = await verifyJWT(token);
    const user = await UserModel.findOne({ _id: decoded._id });
    next();

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
  } catch (error) {
    const err = new Error("Please authenticate");
    next(error);
  }
};

module.exports = { authorize };
