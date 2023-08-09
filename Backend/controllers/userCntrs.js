const User = require("../models/userModel");
const Course = require("../models/courseModel");
const generateJWT = require("../config/generateJWT");
const asyncHandler = require("express-async-handler");

const signupUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(403).json({ message: "User already exists" });
    }
    const newUser = new User({ username, password });
    await newUser.save();
    const token = generateJWT(username, "user");
    res.json({ message: "User created successfully", token });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = generateJWT(username, "user");
      res.json({ message: "Logged in successfully", token });
    } else {
      res.status(403).json({ message: "Invalid username or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const getUserCourses = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ courses: user.purchasedCourses || [] });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const purchaseCourse = asyncHandler(async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const user = await User.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.purchasedCourses) {
      user.purchasedCourses = [];
    }

    // Check if the user already purchased the course
    if (user.purchasedCourses.includes(courseId)) {
      return res.status(403).json({ message: "Course already purchased" });
    }

    user.purchasedCourses.push(courseId);
    await user.save();

    res.json({ message: "Course purchased successfully", courseId });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const getUserPurchasedCourses = asyncHandler(async (req, res) => {
  try {
    const user = await User.findOne({ username: req.user.username });
    const allCourses = await Course.find({});
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      courses: allCourses,
      purchasedCourses: user.purchasedCourses || [],
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const QueryCourses = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [{ title: { $regex: req.query.search, $options: "i" } }],
      }
    : {};

  const courses = await Course.find(keyword);
  res.send(courses);
});

module.exports = {
  signupUser,
  loginUser,
  getUserCourses,
  purchaseCourse,
  getUserPurchasedCourses,
  QueryCourses,
};
