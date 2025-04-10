const express = require('express');
const router = express.Router();
const multer = require('multer');
const Employee = require('../models/Employee');
const employeeController = require('../controllers/employeeController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const ext = file.mimetype;
    if (ext === 'image/jpeg' || ext === 'image/png') cb(null, true);
    else cb(new Error('Only JPG/PNG allowed'), false);
  }
});

router.get('/', async (req, res) => {
  try {
    const { search = '', sort = 'name' } = req.query;
    const regex = new RegExp(search, 'i');
    const employees = await Employee.find({
      $or: [{ name: regex }, { email: regex }]
    }).sort({ [sort]: 1 });

    res.render('employee-list', {
      employees,
      search,
      total: employees.length
    });
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).send('Server error');
  }
});

router.get('/create', employeeController.viewCreateForm);
router.post('/create', upload.single('image'), employeeController.createEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/delete/:id', employeeController.deleteEmployee);
router.get('/edit/:id', employeeController.getEditEmployee);
router.post('/edit/:id', upload.single('image'), employeeController.postEditEmployee);
module.exports = router;
