const todoUser = require("../models/userSchema");
const bcrypt = require("bcrypt");

const { setUser } = require("../authentication/auth");

const handleSignUp = async (req, res) => {
  const { fullName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await todoUser.create({ fullName, email, password: hashedPassword });
    res.status(200).json({ message: "User signed up successfully" });
  } catch (error) {
    console.log({ message: error.message });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user in the dummy database
    const users = await todoUser.findOne({ email: email });

    if (!users) {
      return res.status(401).send("Invalid credentials");
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, users.password);

    if (isMatch) {
    
      const token=setUser(users);
      res.cookie("uid", token, {
        httpOnly: true,
        secure: false, // Set true if using HTTPS
        sameSite: "Lax",
      });
      

      res.json({ userId: users._id });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Error logging in");
  }
};

module.exports = { handleSignUp, handleLogin };
