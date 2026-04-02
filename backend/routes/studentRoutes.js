const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/studentsController');

router.route('/students')
  .get(studentsController.getAllStudents)
  .post(studentsController.createNewStudent);

router.route('/students/:id')
  .put(studentsController.updateStudent)
  .delete(studentsController.deleteStudent);

module.exports = router