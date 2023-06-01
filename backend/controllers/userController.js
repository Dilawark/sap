const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secretKey = process.env.SECRET_KEY;

const generateToken = (userId) => {
  const payload = {
    user: userId,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, secretKey, options);
};

const createNewUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const name = user.name;
    const token = generateToken(user._id);
    res.json({ token, name });
  } catch (error) {
    console.error("Authentication failed", error);
    res
      .status(500)
      .json({ error: "An error occurred while authenticating user" });
  }
};

module.exports = { createNewUser, authUser };
