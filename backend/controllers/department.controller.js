const db = require('../models');
const Department = db.Department;

// Create a new Department
exports.create = async (req, res) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all Departments
exports.findAll = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve a single Department by ID
exports.findOne = async (req, res) => {
  try {
    const department = await Department.findByPk(req.params.department_id);
    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a Department by ID
exports.update = async (req, res) => {
  try {
    const [updated] = await Department.update(req.body, {
      where: { department_id: req.params.department_id }
    });
    if (updated) {
      const updatedDepartment = await Department.findByPk(req.params.department_id);
      res.json(updatedDepartment);
    } else {
      res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a Department by ID
exports.delete = async (req, res) => {
  try {
    const deleted = await Department.destroy({
      where: { department_id: req.params.department_id }
    });
    if (deleted) {
      res.json({ message: 'Department deleted' });
    } else {
      res.status(404).json({ message: 'Department not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
