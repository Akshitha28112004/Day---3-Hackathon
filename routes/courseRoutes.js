// routes/courseRoutes.js

const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new course
router.post('/', async (req, res) => {
  const course = new Course(req.body);
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a course by ID
router.get('/:id', getCourse, (req, res) => {
  res.json(res.course);
});

// Update a course
router.patch('/:id', getCourse, async (req, res) => {
  if (req.body.name != null) {
    res.course.name = req.body.name;
  }
  if (req.body.code != null) {
    res.course.code = req.body.code;
  }
  try {
    const updatedCourse = await res.course.save();
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a course
router.delete('/:id', getCourse, async (req, res) => {
  try {
    await res.course.remove();
    res.json({ message: 'Course deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getCourse(req, res, next) {
  try {
    const course = await Course.findById(req.params.id);
    if (course == null) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.course = course;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;

