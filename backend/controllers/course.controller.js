const db = require('../models');
const Course = db.Course;

// Create a new Course
exports.create = async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all Courses
exports.findAll = async (req, res) => {
  try {
    const courses = await Course.findAll({
      include: [{
        model: db.Credential,
        as: 'credential'
      }]
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single Course by ID
exports.findOne = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id, {
      include: [{
        model: db.Credential,
        as: 'credential'
      }]
    });
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Course by ID
exports.update = async (req, res) => {
  try {
    const [updated] = await Course.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCourse = await Course.findByPk(req.params.id);
      res.json(updatedCourse);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Course by ID
exports.delete = async (req, res) => {
  try {
    const deleted = await Course.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Course deleted' });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
