const db = require('../models');
const Major = db.Major;

// Create a new Major
exports.create = async (req, res) => {
  try {
    const major = await Major.create(req.body);
    res.status(201).json(major);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all Majors
exports.findAll = async (req, res) => {
  try {
    const majors = await Major.findAll({
      include: [{
        model: db.Department,
        as: 'department'
      }]
    });
    res.json(majors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Retrieve all Majors
exports.findAll = async (req, res) => {
  try {
    const majors = await Major.findAll({
      include: [{
        model: db.Department,
        as: 'department' // Make sure the alias matches
      }]
    });
    res.json(majors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single Major by ID
exports.findOne = async (req, res) => {
  try {
    const major = await Major.findByPk(req.params.major_id, {
      include: [{
        model: db.Department,
        as: 'department' // Make sure the alias matches
      }]
    });
    if (major) {
      res.json(major);
    } else {
      res.status(404).json({ message: 'Major not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Major by ID
exports.update = async (req, res) => {
  try {
    const [updated] = await Major.update(req.body, {
      where: { major_id: req.params.major_id }
    });
    if (updated) {
      const updatedMajor = await Major.findByPk(req.params.major_id);
      res.json(updatedMajor);
    } else {
      res.status(404).json({ message: 'Major not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Major by ID
exports.delete = async (req, res) => {
  try {
    const deleted = await Major.destroy({
      where: { major_id: req.params.major_id }
    });
    if (deleted) {
      res.json({ message: 'Major deleted' });
    } else {
      res.status(404).json({ message: 'Major not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};