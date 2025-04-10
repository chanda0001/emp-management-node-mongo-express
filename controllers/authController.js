const User = require('../models/users');

exports.login = async (req, res) => {
  const { userName, password } = req.body;  

  const user = await User.findOne({
    userName: { $regex: new RegExp(`^${userName}$`, 'i') },
    password: password
  });

  if (user) {
    res.json({ success: true, userName: user.userName });
    
  } else {
    res.json({ success: false, message: "Invalid credentials" });
  }
};