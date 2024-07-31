const db = require('../models');
const AdminStaff = db.AdminStaff;

// Create a new AdminStaff
exports.create = async (req, res) => {
  try {
    const adminStaff = await AdminStaff.create(req.body);
    res.json(adminStaff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Retrieve all AdminStaff
exports.findAll = async (req, res) => {
  try {
    const adminStaffs = await AdminStaff.findAll();
    res.json(adminStaffs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find a single AdminStaff by ID
exports.findOne = async (req, res) => {
  try {
    const adminStaff = await AdminStaff.findByPk(req.params.staff_id);
    if (adminStaff) {
      res.json(adminStaff);
    } else {
      res.status(404).json({ message: 'AdminStaff not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an AdminStaff by ID
exports.update = async (req, res) => {
  try {
    const [updated] = await AdminStaff.update(req.body, {
      where: { staff_id: req.params.staff_id }
    });
    if (updated) {
      const updatedAdminStaff = await AdminStaff.findByPk(req.params.staff_id);
      res.json(updatedAdminStaff);
    } else {
      res.status(404).json({ message: 'AdminStaff not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an AdminStaff by ID
exports.delete = async (req, res) => {
  try {
    const deleted = await AdminStaff.destroy({
      where: { staff_id: req.params.staff_id }
    });
    if (deleted) {
      res.json({ message: 'AdminStaff deleted' });
    } else {
      res.status(404).json({ message: 'AdminStaff not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminStaff = await AdminStaff.findOne({ where: { email } });

    if (!adminStaff) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, adminStaff.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // You can generate and return a JWT token here if needed

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}