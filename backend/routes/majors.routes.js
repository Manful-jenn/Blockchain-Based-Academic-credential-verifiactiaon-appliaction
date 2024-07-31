module.exports = app => {
    const majors = require('../controllers/major.controller.js');
    
    const router = require('express').Router();
    
    // Create a new Major
    router.post('/', majors.create);
    
    // Retrieve all Majors
    router.get('/', majors.findAll);
    
    // Retrieve a single Major with id
    router.get('/:major_id', majors.findOne);
    
    // Update a Major with id
    router.put('/:major_id', majors.update);
    
    // Delete a Major with id
    router.delete('/:major_id', majors.delete);
    
    app.use('/api/major', router);
  };
  