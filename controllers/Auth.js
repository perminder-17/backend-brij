const bcrypt = require("bcrypt")
const User = require("../models/User")
const jwt = require("jsonwebtoken")
require("dotenv").config()

// Signup Controller for Registering Users
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create the user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })

    res.status(201).json({ message: "User created successfully", user })
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error })
  }
}

// Login Controller for Authenticating Users
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find the user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    })

    res.status(200).json({ message: "Login successful", token })
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error })
  }
}