const express = require("express");
const jwtAuth = require("../Middleware/jwtAuthMDW");

const {
  signupAdmin,
  loginAdmin,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  getUsername,
} = require("../controllers/adminCntrs");

const router = express.Router();

router.route("/signup").post(signupAdmin);
router.route("/login").post(loginAdmin);
router.route("/courses").post(jwtAuth, createCourse);
router.route("/courses/:courseId").put(jwtAuth, updateCourse);
router.route("/courses/:courseId").delete(jwtAuth, deleteCourse);
router.route("/courses").get(jwtAuth, getCourses);
router.route("/me").get(jwtAuth, getUsername);

module.exports = router;
