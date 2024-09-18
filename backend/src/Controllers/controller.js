const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
//email validation function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

exports.signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!validateEmail(email)) {
      return res.json({ message: "Enter valid email." }).status(400);
    }
    const exist = await UserModel.findOne({ email: email });
    if (exist) {
      return res.json({ message: "User already exist" }).status(400);
    }
    if (password.length < 4) {
      return res.json({ message: "Password must be 4 letters" }).status(400);
    }
    // bcrypt the plain password
    const hashedPassword = await bcrypt.hash(password, 10);
    //save user data to db
    const newUser = new UserModel({
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "Registration success !!" });
  } catch (error) {
    return res.status(500);
  }
};
