const generateJWT = require("../config/generateJWT");
const Admin = require("../models/adminModel");
const Course = require("../models/courseModel");
const asyncHandler = require("express-async-handler");

const signupAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const newAdmin = new Admin({ username, password });
      await newAdmin.save();
      const token = generateJWT(username, "admin");
      res.json({ message: "Admin created successfully", token });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username, password });
    if (admin) {
      const token = generateJWT(username, "admin");
      res.json({ message: "Logged in successfully", token });
    } else {
      res.status(403).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, imageLink } = req.body;
  try {
    const newCourse = new Course({ title, description, price, imageLink });
    await newCourse.save();
    res.json({
      message: "Course created successfully",
      courseId: newCourse._id,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const updateCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });
    if (course) {
      res.json({ message: "Course updated successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const deleteCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findByIdAndDelete(courseId);
    if (course) {
      res.json({ message: "Course deleted successfully" });
    } else {
      res.status(404).json({ message: "Course not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const getCourses = asyncHandler(async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const getOneCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);
    course
      ? res.json({ course })
      : res.status(404).json({ message: "Course not found" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const getUsername = asyncHandler(async (req, res) => {
  const { username } = req.user;
  if (username) {
    res.json({ username });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

module.exports = {
  signupAdmin,
  loginAdmin,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourses,
  getUsername,
  getOneCourse,
};
