const Store = require("../models/Store");
const { errHandler } = require("../utils/Utils");

const createStore = () => async (req, res, next) => {
  try {
    const creationData = {
      email: req.user.email,
      ...req.body,
      ownerId: req.user._id,
    };
    const data = await Store.create(creationData);
    return res.status(200).json({
      message: "Your store:",
      status: true,
      data,
    });
  } catch (error) {
    errHandler(error, res, next);
  }
};

const getStores = () => async (req, res, next) => {
  try {
    const data = await Store.find({ ownerId: req.user._id });
    return res
      .status(200)
      .json({ message: "Your stores: ", status: true, data });
  } catch (error) {
    errHandler(error, res, next);
  }
};

const getOneStore = (asMiddleware = false) => async (req, res, next) => {
  try {
    const { store: _id } = req.params;
    const store = await Store.findOne({ _id });
    if (!store) {
      return res.status(404).json({
        message: "Store not found",
        status: false,
      });
    }
    if (asMiddleware) {
      req.store = store;
      return next();
    }
    return res
      .status(200)
      .json({ message: "Your store", status: true, data: store });
  } catch (error) {
    errHandler(error, res, next);
  }
};

const deleteStore = () => async (req, res, next) => {
  try {
    await req.store.remove();
    return res
      .status(200)
      .json({ message: "Store deleted:", status: true, data: null });
  } catch (error) {
    errHandler(error, res, next);
  }
};

const updateStore = () => async (req, res, next) => {
  try {
    const data =
      (await req.store.updateOne(req.body)) &&
      (await Store.findById(req.store._id));
    res.status(200).json({
      message: "Store details updated:",
      status: true,
      data,
    });
  } catch (error) {
    errHandler(error, res, next);
  }
};

module.exports = {
  createStore,
  getStores,
  getOneStore,
  deleteStore,
  updateStore,
};
