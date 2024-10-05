const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: '*'
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const jwt = require("jsonwebtoken");


const uri = 'mongodb+srv://prince1:prince1@cluster0.ihexm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
    mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 3000");
});

const User = require("./models/user");
const Post = require("./models/post");

//endpoint to register a user in the backend
app.post("/register", async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    if (!name || !email || !password || !profileImage) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    //check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered");
      return res.status(400).json({ message: "Email already registered" });
    }

    //create a new User
    const newUser = new User({
      name,
      email,
      password,
      profileImage,
    });

    //generate the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    await newUser.save();

    //send the verification email to the registered user
    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(202).json({
      message:
        "Registration successful.Please check your mail for verification",
    });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

const sendVerificationEmail = async (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "princejuniorob@gmail.com",
      pass: "fhlk ocnu kbav pcfg",
    },
  });

  const mailOptions = {
    from: "princejunior@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `please click the following link to verify your email : http://localhost:3000/verify/${verificationToken}`,
  };

  //send the mail
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.log("Error sending the verification email");
  }
};

//endpoint to verify email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }

    //mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email verification failed" });
  }
});

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};

const secretKey = generateSecretKey();

//endpoint to login a user.
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user exists already
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //check if password is correct
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});

//user's profile
app.get("/profile/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving user profile" });
  }
});

app.get("/users/:userId", async (req, res) => {
  try {
    const loggedInUserId = req.params.userId;

    //fetch the logged-in user's connections
    const loggedInuser = await User.findById(loggedInUserId).populate(
      "connections",
      "_id"
    );
    if (!loggedInuser) {
      return res.status(400).json({ message: "User not found" });
    }

    //get the ID's of the connected users
    const connectedUserIds = loggedInuser.connections.map(
      (connection) => connection._id
    );

    //find the users who are not connected to the logged-in user Id
    const users = await User.find({
      _id: { $ne: loggedInUserId, $nin: connectedUserIds },
    });

    res.status(200).json(users);
  } catch (error) {
    console.log("Error retrieving users", error);
    res.status(500).json({ message: "Error retrieving users" });
  }
});

