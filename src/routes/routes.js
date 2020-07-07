const router = require("express").Router();
const Validation = require("../utils/Validator");
const UserController = require("../controllers/UserController");

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

module.exports = router;
