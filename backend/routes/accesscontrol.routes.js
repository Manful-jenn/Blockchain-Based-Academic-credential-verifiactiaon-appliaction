module.exports = app => {
    const accessControl = require('../controllers/accesscontrol.controller');
    const router = require('express').Router();
  
    // Create a new AccessControl entry
    router.post('/', accessControl.create);
  
    // Retrieve all AccessControl entries
    router.get('/', accessControl.findAll);
  
    // Retrieve an AccessControl entry by ID
    router.get('/:id', accessControl.findOne);
  
    // Update an AccessControl entry by ID
    router.put('/:id', accessControl.update);
  
    // Delete an AccessControl entry by ID
    router.delete('/:id', accessControl.delete);

    // Grant access
    router.post('/grant', accessControl.grantAccess);

    // Revoke access
    router.post('/revoke', accessControl.revokeAccess);
  
    // check access
    router.post('/check', accessControl.checkAccess);

     // check access status
     router.post('/status', accessControl.checkAccessStatus);

    app.use('/api/accesscontrols', router);
  };
  