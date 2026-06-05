const User = require('../models/User');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For generating tokens

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude the password field
    res.json({ users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const {
      fullName = '',
      firstName: rawFirstName = '',
      lastName: rawLastName = '',
      email = '',
      username = '',
      password,
    } = req.body;

    const [derivedFirstName = '', ...derivedLastName] = fullName.trim().split(/\s+/);
    const firstName = rawFirstName.trim() || derivedFirstName;
    const lastName = rawLastName.trim() || derivedLastName.join(' ') || 'User';
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedUsername = username.trim();

    if (!firstName || !normalizedEmail || !normalizedUsername) {
      return res.status(400).json({ message: 'Full name, email, and username are required' });
    }

    if (!password) {
      return res.status(400).json({ message: 'Password is required' });
    }

    const existingUser = await User.findOne({
      $or: [{ email: normalizedEmail }, { username: normalizedUsername }],
    });

    if (existingUser) {
      return res.status(409).json({ message: 'Email or username is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      age: req.body.age || '18',
      gender: req.body.gender || 'other',
      contactNumber: req.body.contactNumber || '00000000000',
      email: normalizedEmail,
      type: req.body.type || req.body.role || 'editor',
      username: normalizedUsername,
      password: hashedPassword,
      address: req.body.address || 'Not provided',
      isActive: true,
    });

    const token = jwt.sign(
      { id: user._id, email: user.email, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        type: user.type,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    // Check if the password is being updated
    if (req.body.password) {
      // Hash the new password
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Update the user with the new data
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email = '', password } = req.body;
    const normalizedEmail = email.trim().toLowerCase();

    // Find the user by email
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the user is active
    if (!user.isActive) {
      return res.status(403).json({ message: 'Your account is inactive. Please contact support.' });
    }

    if (user.type === 'viewer') {
      return res.status(403).json({ message: 'Viewers are not allowed to login.' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, type: user.type }, // Include type in the token
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ 
      message: 'Login successful', 
      token, 
      type: user.type, 
      firstName: user.firstName 
    }); // Include type in the response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser, loginUser };
