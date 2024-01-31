const express = require('express');
const helpController = require('../../controllers/helpController');
const employeeController = require("../../controllers/employeeController");

const router = express.Router();

router.get('/help', helpController.helpDetails);
router.patch('/employee', employeeController.update);
router.get('/employee/:id/tax', employeeController.calculateTax);

module.exports = router;