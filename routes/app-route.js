const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.get('/', employeeController.viewLogimnForm);
router.get('/login', employeeController.viewLogimnForm);
router.get('/home', employeeController.viewDashboard);
module.exports = router;
