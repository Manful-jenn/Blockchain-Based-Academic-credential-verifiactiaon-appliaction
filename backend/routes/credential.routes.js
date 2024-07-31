module.exports = app => {
    const credentials = require('../controllers/credential.controller.js');
    
    const router = require('express').Router();
    
    // Create a new Credential
    router.post('/', credentials.create);
    
    // Retrieve all Credentials
    router.get('/', credentials.findAll);
    
    // Retrieve a single Credential with id
    router.get('/:id', credentials.findOne);
    
    // Update a Credential with id
    router.put('/:id', credentials.update);
    
    // Delete a Credential with id
    router.delete('/:id', credentials.delete);
    
    app.use('/api/credentials', router);
  };
  