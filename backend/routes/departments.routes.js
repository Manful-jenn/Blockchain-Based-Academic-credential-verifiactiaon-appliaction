module.exports = app => {
    const departments = require('../controllers/department.controller.js');
    
    const router = require('express').Router();
    
    // Create a new Department
    router.post('/', departments.create);
    
    // Retrieve all Departments
    router.get('/', departments.findAll);
    
    // Retrieve a single Department with id
    router.get('/:department_id', departments.findOne);
    
    // Update a Department with id
    router.put('/:department_id', departments.update);
    
    // Delete a Department with id
    router.delete('/:department_id', departments.delete);
    
    app.use('/api/department', router);
  };
  