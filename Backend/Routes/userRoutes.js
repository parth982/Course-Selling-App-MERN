const express = require("express");
const jwtAuth = require("../Middleware/jwtAuthUser");
const {
  signupUser,
  loginUser,
  getUserCourses,
  purchaseCourse,
  getUserPurchasedCourses,
  QueryCourses,
  getUsername,
} = require("../controllers/userCntrs");

const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/courses").get(jwtAuth, getUserCourses);
router.route("/courses/:courseId").put(jwtAuth, purchaseCourse);
router.route("/purchasedCourses").get(jwtAuth, getUserPurchasedCourses);
router.route("/queryCourses").get(jwtAuth, QueryCourses);
router.route("/username").get(jwtAuth, getUsername);

module.exports = router;
