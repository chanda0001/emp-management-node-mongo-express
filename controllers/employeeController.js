const Employee = require('../models/Employee');


exports.viewLogimnForm = async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.viewDashboard = async (req, res) => {
  try {
    res.render('dashboard');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
};


exports.viewCreateForm = async (req, res) => {
  try {
    res.render('create-employee');
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send('Internal Server Error');
  }
};

exports.createEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, course } = req.body;

  // Check if email already exists
  const exists = await Employee.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already exists" });

  const newEmployee = new Employee({
    name,
    email,
    mobile,
    designation,
    gender,
    course: Array.isArray(course) ? course : [course],
    image: req.file.filename,
  });

  console.log("New employee data:", newEmployee);
  await newEmployee.save();
  res.json({ success: true, message: "Employee created" });
};


exports.getEditEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).send('Employee not found');
    }
    res.render('edit-employee', { employee });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// POST: Handle update
exports.postEditEmployee = async (req, res) => {
  try {
    const updateData = { ...req.body };
    console.log("Incoming updateData:", updateData);

    // Normalize 'course' to always be an array
    if (!Array.isArray(updateData.course)) {
      updateData.course = updateData.course ? [updateData.course] : [];
    }

    // If image was uploaded, include it in the update
    if (req.file) {
      updateData.image = req.file.filename;
    }

    // Update employee by ID
    await Employee.findByIdAndUpdate(req.params.id, updateData);

    // Redirect to employee list
    res.redirect('/employee');
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).send('Server error');
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render('employee-list', { employees });
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).send('Internal Server Error');
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect('/employee'); 
  } catch (err) {
    console.error('Error deleting employee:', err);
    res.status(500).send('Error deleting employee');
  }
};


exports.getAllEmployees = async (req, res) => {
  try {
    const searchQuery = req.query.search || '';
    let query = {};

    if (searchQuery) {
      query = {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          { email: { $regex: searchQuery, $options: 'i' } },
          { mobile: { $regex: searchQuery, $options: 'i' } },
          { designation: { $regex: searchQuery, $options: 'i' } },
          { course: { $regex: searchQuery, $options: 'i' } },
          { gender: { $regex: searchQuery, $options: 'i' } }
        ]
      };
    }

    const employees = await Employee.find(query);
    res.render('employee-list', { employees, search: searchQuery });

  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).send('Internal Server Error');
  }
};

