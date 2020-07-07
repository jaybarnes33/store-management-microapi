const User = require("../models/User");
const { randStringGen, errHandler } = require("../utils/Utils");

const joinService = () => async (req, res, next) => {
  try {
    const apiKey = randStringGen(30);
    const user = await User.create({ ...req.body, apiKey });
    res.status(200).json({
      status: true,
      message: "Joined successfully",
      data: user.toJson(),
    });
  } catch (error) {
    errHandler(error, res, next);
  }
};

const signIn = () => async (req, res, next) => {
  try {
    const { email, password = "", username } = req.body;
    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user || !(await user.authenticate(password))) {
      return res.status(401).json({
        message: "invalid login credentials",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Sign in successfull",
      status: true,
      data: user.toJson(),
    });
  } catch (error) {
    errHandler(error, res, next);
  }
};

const decodeToken = () => async (req, res, next) => {
  try {
    if (req.query && req.query.hasOwnProperty("apiKey")) {
      req.headers.authorization = `Bearer ${req.query.apiKey}`;
    }
    const apiKey = req.headers.authorization.replace("Bearer ", "");
    const user = await User.findOne({ apiKey });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "Invalid apiKey or apiKey format",
      });
    }
    req.user = user;
    return next();
  } catch (error) {
    errHandler(error, res, next);
  }
};

const updateUser = () => async (req, res, next) => {
  try {
    const data =
      (await req.user.updateOne(req.body)) &&
      (await User.findById(req.user._id));
    return res.status(200).json({
      message: "Updated:",
      status: true,
      data: data.toJson(),
    });
  } catch (error) {
    errHandler(error, res, next);
  }
};

const newToken = () => async (req, res, next) => {
  try {
    const apiKey = randStringGen(30);
    const user =
      (await req.user.updateOne({ apiKey })) &&
      (await User.findById(req.user._id));
    return res.status(200).json({
      message: "New apiKey:",
      status: true,
      data: {
        apiKey,
      },
    });
  } catch (error) {
    errHandler(error, res, next);
  }
};

module.exports = {
  joinService,
  decodeToken,
  updateUser,
  signIn,
  newToken,
};
