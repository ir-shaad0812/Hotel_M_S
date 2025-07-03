
import User from "../models/User.js";
import JWT from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register controller
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const user = await User.findOne({ email });
    
    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }

    // hash password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user 
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

   return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
   return res.status(500).json({ error: "Server error" });
  }
};

// // login controller
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

export const getUserInfo = (req, res) => {
  const token = req.headers.authorization.split(" ")[1]; // Get token from Authorization header

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  JWT.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    try {
      const user = await User.findById(decoded.id); // Assuming the ID is stored in the token
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ user }); // Send the user data back to the client
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  });
};