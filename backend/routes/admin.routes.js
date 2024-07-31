module.exports = app => {
    const adminstaff = require('../controllers/admin.controller.js');
    
    const router = require('express').Router();
    
    // Create a new AdminStaff
    router.post('/', adminstaff.create);
    
    // Retrieve all AdminStaff
    router.get('/', adminstaff.findAll);
    
    // Retrieve a single AdminStaff with id
    router.get('/:staff_id', adminstaff.findOne);
    
    // Update an AdminStaff with id
    router.put('/:staff_id', adminstaff.update);
    
    // Delete an AdminStaff with id
    router.delete('/:staff_id', adminstaff.delete);

    // Login an External
    router.post('/login', adminstaff.login);
    
    app.use('/api/adminstaff', router);
  };
  