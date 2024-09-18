const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

//email validation function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Registration controller
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
      return res.json({ message: "Password atleast 4 letters" }).status(400);
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

// user login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!validateEmail(email))
      return res.json({ message: "Enter valid email" }).status(400);
    if (password.length < 4)
      return res.status(400).json({ message: "Password atlest 4 letter" });

    const exist = await UserModel.findOne({ email });
    if (!exist) {
      return res.json({ message: "User not exist " }).status(400);
    }
    const comparedPass = await bcrypt.compare(password, exist.password);
    if (!comparedPass)
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ userId: exist._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, message: "Login successful" });
  } catch (error) {
    return res.status(500);
  }
};
