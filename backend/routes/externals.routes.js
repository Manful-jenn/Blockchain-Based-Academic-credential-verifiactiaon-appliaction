module.exports = app => {
    const externals = require('../controllers/externals.controller.js');
    
    const router = require('express').Router();
    
    // Create a new External
    router.post('/', externals.create);
    
   
    // Retrieve all Externals
    router.get('/', externals.findAll);
    
    // Retrieve a single External with id
    router.get('/:visitor_id', externals.findOne);
    
    // Update an External with id
    router.put('/:visitor_id', externals.update);
    
    // Delete an External with id
    router.delete('/:visitor_id', externals.delete);

    // Login an External
    router.post('/login', externals.login);

    // Logout an External
    router.get('/logout', externals.logout);

    
    app.use('/api/externals', router);
  };
  