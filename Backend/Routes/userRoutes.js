const express = require("express");
const jwtAuth = require("../Middleware/jwtAuthMDW");
const {
  signupUser,
  loginUser,
  getUserCourses,
  purchaseCourse,
  getUserPurchasedCourses,
  QueryCourses,
} = require("../controllers/userCntrs");

const router = express.Router();

router.route("/signup").post(signupUser);
router.route("/login").post(loginUser);
router.route("/courses").get(jwtAuth, getUserCourses);
router.route("/courses/:courseId").put(jwtAuth, purchaseCourse);
router.route("/purchasedCourses").get(jwtAuth, getUserPurchasedCourses);
router.route("/queryCourses").get(jwtAuth, QueryCourses);

module.exports = router;
