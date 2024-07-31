module.exports = app => {
    const students = require('../controllers/student.controller.js');
    
    const router = require('express').Router();
    
    // Create a new Student
    router.post('/', students.create);
    
    // Retrieve all Students
    router.get('/', students.findAll);
    
    // Retrieve a single Student with id
    router.get('/:student_id', students.findOne);
    
    // Update a Student with id
    router.put('/:student_id', students.update);
    
    // Delete a Student with id
    router.delete('/:student_id', students.delete);

    // Login a student
    router.post('/login', students.login);

     // Logout a student
     router.get('/logout', students.logout);
    
    app.use('/api/students', router);
  };
   