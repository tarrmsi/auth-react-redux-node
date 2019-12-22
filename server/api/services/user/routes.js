const express = require("express");
const passport = require("passport");

const { register, login, getUser, logout } = require("./controller");
const { validateBody, schemas } = require("./validation");

const passportJWT = passport.authenticate("jwt", { session: false });
const passportLocal = passport.authenticate("local", { session: false });
const JOIvalidation = validateBody(schemas.authSchema);

const router = express.Router();

router.route("/user").get(passportJWT, getUser);
router.route("/register").post(JOIvalidation, register);
router.route("/login").post(JOIvalidation, passportLocal, login);
router.route("/logout").get(passportJWT, logout);

module.exports = router;
