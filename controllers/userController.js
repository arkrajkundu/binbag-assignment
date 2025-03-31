import User from '../models/user.js';
import generateToken from '../config/auth.js';

// Register User function
export const registerUser = async (req, res) => {
  const { name, email, password, address, bio } = req.body;
  let profilePicture = req.file ? `/uploads/profile_pictures/${req.file.filename}` : '';  // Optional profile picture

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const newUser = new User({
      name,
      email,
      password,
      address,
      bio: bio || '',  // Optional
      profilePicture  // Optional, will be set if an image is uploaded
    });
    await newUser.save();

    const token = generateToken(newUser._id);
    res.status(201).json({ token, user: { name, email, address, bio, profilePicture } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login User function
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ token, user: { name: user.name, email: user.email, address: user.address } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get User Profile function
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update User Profile function
import User from '../models/user.js';
import generateToken from '../config/auth.js';

export const updateUserProfile = async (req, res) => {
  const { name, address, bio } = req.body;
  let profilePicture = req.user.profilePicture;  // Default to existing profile picture

  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update fields if provided
    user.name = name || user.name;
    user.address = address || user.address;
    user.bio = bio !== undefined ? bio : user.bio;  // Only update bio if it's provided

    // If a new profile picture is uploaded, update the profile picture path
    if (req.file) {
      profilePicture = `/uploads/profile_pictures/${req.file.filename}`;
      user.profilePicture = profilePicture;
    }

    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};