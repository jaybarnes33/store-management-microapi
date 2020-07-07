const router = require("express").Router();
const Validation = require("../utils/Validator");
const UserController = require("../controllers/UserController");
const StoreController = require("../controllers/StoreController");

router.post(
  "/register",
  Validation.validateRegisterRoute(),
  UserController.joinService()
);
router.post(
  "/signin",
  Validation.validateSignInRoute(),
  UserController.signIn()
);

router.use(UserController.decodeToken());
router
  .route("/me")
  .get((req, res) =>
    res
      .status(200)
      .json({ status: true, message: "Your details:", data: req.user.toJson() })
  )
  .put(Validation.validateUserUpdateRoute(), UserController.updateUser());
router
  .route("/token")
  .get((req, res) =>
    res.status(200).json({
      status: true,
      message: "Your apiKey",
      data: { apiKey: req.user.apiKey },
    })
  )
  .put(UserController.newToken());

router
  .route("/stores")
  .get(StoreController.getStores())
  .post(Validation.validateStoreCreation(), StoreController.createStore());
const { getOneStore: GOS } = StoreController;
router
  .route("/stores/:store")
  .get(GOS())
  .put(
    Validation.validateStoreUpdate(),
    GOS(true),
    StoreController.updateStore()
  )
  .delete(GOS(true), StoreController.deleteStore());

module.exports = router;
