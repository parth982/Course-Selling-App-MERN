const express = require("express");
const jwtAuth = require("../Middleware/jwtAuthAdmin");

const {
  signupAdmin,
  loginAdmin,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  getUsername,
  getOneCourse,
} = require("../controllers/adminCntrs");

const router = express.Router();

router.route("/signup").post(signupAdmin);
router.route("/login").post(loginAdmin);
router.route("/courses").post(jwtAuth, createCourse);
router.route("/courses/:courseId").get(jwtAuth, getOneCourse);
router.route("/courses/:courseId").put(jwtAuth, updateCourse);
router.route("/courses/:courseId").delete(jwtAuth, deleteCourse);
router.route("/courses").get(jwtAuth, getCourses);
router.route("/username").get(jwtAuth, getUsername);

module.exports = router;
