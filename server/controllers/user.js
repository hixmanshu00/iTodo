const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require('../models/user.js');
const crypto = require("crypto");

// Function to generate a random secret key for JWT token generation
const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

// Function to handle user registration
const register = async (req, res) => {
  try {
    // Extract name, email, and password from the request body
    const { name, email, password } = req.body;

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already exists");
      return res.status(500).json({ message: "User already exists" });
    }

    // Hash the user's password before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new User document with the provided details and the hashed password
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with a success message if registration is successful
    res.status(202).json({ message: "User registered successfully" });
  } catch (error) {
    console.log("Error registering the user", error);
    // Respond with an error message if registration fails
    res.status(500).json({ message: "Registration failed" });
  }
};

// Function to handle user login
const login = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Find the user by their email address
    const user = await User.findOne({ email });
    if (!user) {
      // If the user is not found, respond with a 401 Unauthorized status
      return res.status(401).json({ message: "Invalid email" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      // If the passwords don't match, respond with a 401 Unauthorized status
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a secret key for signing the JWT token
    const secretKey = generateSecretKey();

    // Create a JWT token containing the user's ID, signed with the generated secret key
    const token = jwt.sign({ userId: user._id, userName: user.name, userEmail: user.email }, secretKey);

    // Respond with the generated token
    res.status(200).json({ token });
  } catch (error) {
    console.log("Login failed", error);
    // Respond with an error message if login fails
    res.status(500).json({ message: "Login failed" });
  }
};

// Export the register and login functions to be used in other files
module.exports = {
  register,
  login,
};
