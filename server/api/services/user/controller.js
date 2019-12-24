const User = require("./model");

// @route   GET /api/auth/user
// @desc    Get logged in user
// @access  Private
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(`< GET /user > error message: \n ${err.message}`);
  }
};

// @route   POST /api/auth/register
// @desc    Register a user
// @access  Public
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // check if user with the email provided is already registered
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // create new user
    const newUser = new User({
      username,
      email,
      password
    });
    await newUser.save();

    // generate token
    const token = newUser.generateToken(newUser);
    // send cookie containing jwt
    res.cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(`< POST /register > error message: \n ${err.message}`);
  }
};

// @route   POST /api/auth/login
// @desc    Login a user
// @access  Public
exports.login = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    const token = user.generateToken(req.user);
    res.cookie("access_token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    res.status(200).json({ success: true });
  } catch (err) {
    console.error(`< POST /login > error message: \n ${err.message}`);
  }
};

// @route   GET /api/auth/logout
// @desc    Logout a user / clear cookie
// @access  Private
exports.logout = async (req, res) => {
  try {
    res.clearCookie("access_token");
    res.json({ success: true });
  } catch (err) {
    console.error(`< GET /logout > error message: \n ${err.message}`);
  }
};
