const db = require('../models');
const bcrypt = require('bcrypt');
const Student = db.Student;

// Create a new Student
exports.create = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all Students
exports.findAll = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find a single Student by ID
exports.findOne = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.student_id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Student by ID
exports.update = async (req, res) => {
  try {
    const [updated] = await Student.update(req.body, {
      where: { student_id: req.params.student_id }
    });
    if (updated) {
      const updatedStudent = await Student.findByPk(req.params.student_id);
      res.json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Student by ID
exports.delete = async (req, res) => {
  try {
    const deleted = await Student.destroy({
      where: { student_id: req.params.student_id }
    });
    if (deleted) {
      res.json({ message: 'Student deleted' });
    } else {
      res.status(404).json({ message: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a student
exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;

      const student = await Student.findOne({ where: { email } });

      if (!student) {
          return res.status(404).json({ message: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, student.password);

      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
      }

      // Set session with student ID
      req.session.user = {
          student_id: student.student_id,
          email: student.email
      };

      res.status(200).json({ message: 'Login successful', student_id: student.student_id });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout a student
exports.logout = (req, res) => {
  req.session.destroy((err) => {
      if (err) {
          return res.status(500).send('Logout error');
      }
      res.clearCookie('connect.sid'); // Clear session cookie
      res.status(200).send('Logout successful');
  });
};