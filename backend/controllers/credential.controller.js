const db = require('../models');
const Credential = db.Credential;

// Create a new Credential
exports.create = async (req, res) => {
  try {
    const credential = await Credential.create(req.body);
    res.status(201).json(credential);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all Credentials
exports.findAll = async (req, res) => {
  try {
    const credentials = await Credential.findAll({
      include: [{
        model: db.Student,
        as: 'student'
      }, {
        model: db.Course,
        as: 'courses'
      }]
    });
    res.json(credentials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single Credential by ID
exports.findOne = async (req, res) => {
  try {
    const credential = await Credential.findByPk(req.params.id, {
      include: [{
        model: db.Student,
        as: 'student'
      }, {
        model: db.Course,
        as: 'courses'
      }]
    });
    if (credential) {
      res.json(credential);
    } else {
      res.status(404).json({ message: 'Credential not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Credential by ID
exports.update = async (req, res) => {
  try {
    const [updated] = await Credential.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedCredential = await Credential.findByPk(req.params.id);
      res.json(updatedCredential);
    } else {
      res.status(404).json({ message: 'Credential not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Credential by ID
exports.delete = async (req, res) => {
  try {
    const deleted = await Credential.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.json({ message: 'Credential deleted' });
    } else {
      res.status(404).json({ message: 'Credential not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
