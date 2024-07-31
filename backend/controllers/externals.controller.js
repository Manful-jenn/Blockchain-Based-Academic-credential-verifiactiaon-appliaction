const db = require('../models');
const bcrypt = require('bcrypt');
const External = db.External;

// Create a new External
// exports.create = async (req, res) => {
//   try {
//     console.log('Received request:', req.body);
//     const external = await External.create(req.body);
//     console.log('Created external:', external);
//     res.status(201).json(external);
//   } catch (error) {
//     console.error('Error creating external:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// Create a new External
exports.create = async (req, res, next) => {
  try {
    console.log('Received request:', req.body);

    // Input validation can be added here if needed

    const external = await External.create(req.body);
    console.log('Created external:', external);

    res.status(201).json(external);
  } catch (error) {
    console.error('Error creating external:', error);

    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({
        message: 'Validation error',
        errors: error.errors.map(err => err.message),
      });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};



// Retrieve all externals
exports.findAll = async (req, res) => {
  try {
    const externals = await External.findAll();
    res.status(200).json(externals);
  } catch (error) {
    console.error('Error fetching externals:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve a single External by ID
exports.findOne = async (req, res) => {
  try {
    const external = await External.findByPk(req.params.visitor_id);
    if (external) {
      res.json(external);
    } else {
      res.status(404).json({ message: 'External not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an External by ID
exports.update = async (req, res) => {
  try {
    const [updated] = await External.update(req.body, {
      where: { visitor_id: req.params.visitor_id }
    });
    if (updated) {
      const updatedExternal = await External.findByPk(req.params.visitor_id);
      res.json(updatedExternal);
    } else {
      res.status(404).json({ message: 'External not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an External by ID
exports.delete = async (req, res) => {
  try {
    const deleted = await External.destroy({
      where: { visitor_id: req.params.visitor_id }
    });
    if (deleted) {
      res.json({ message: 'External deleted' });
    } else {
      res.status(404).json({ message: 'External not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login an External
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const external = await External.findOne({ where: { email } });

    if (!external) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, external.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    } 

    // Save the user's information in the session
    req.session.user = { email: external.email, external_id: external.external_id };
    
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout an External
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.status(200).json({ message: 'Logout successful' });
  });
};
