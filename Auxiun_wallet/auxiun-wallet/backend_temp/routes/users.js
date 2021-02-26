const router = require("express").Router();
let User = require("../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//const { registerValidation, loginValidation } = require('../validation/validation');
const Joi = require("@hapi/joi");
////
//
// add Joi validation
// make usernames unique
// encrypt passwords (bcrypt.js)
// create JWT web token
//
////


// Get all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

//register a new user
router.route("/new").post(async (req, res) => {
  console.log(req.body);
  //VALIDATE THE REGISTERED INFO
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(6).required(),
    firstname: Joi.string().min(1).required(),
    lastname: Joi.string().min(1).required()
  });
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
 
  //Check database for unique username
  const usernameExist = await User.findOne({
    username: req.body.username,
  });
  if (usernameExist) return res.status(400).send("Username already exists");
  
  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  //create the user object to be saved to the database
  const username = req.body.username;
  const password = hashPassword;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  let newUser = User({
    username,
    password,
    firstname,
    lastname,
    coinbalance: 0
  });

  newUser
    .save()
    .then(async () => {
      const userID = await User.findOne({ username });
      //create and assign a web token
      const token = jwt.sign({ _id: userID._id }, process.env.TOKEN_SECRET);
      newUser = {
        newUser,
        success: true,
        authKey: token
      }
      res.header("auth-token", token).json(newUser);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

//login
router.route("/login").post(async (req, res) => {
  //VALIDATE THE REGISTERED INFO
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(7).required(),
  });
  const { error } = schema.validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  //Check database for login username
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user) return res.status(400).send("Username does not exist");
  //password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  //create and assign a web token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  const newUser = {
    user,
    authKey: token,
    success: true
  }
  res.header("auth-token", token).send(newUser);

  //res.send('Logged in');
});

// get info for an individual user
router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

//delete a user
router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// update info for a user
router.route("/:id").put(async (req, res) => {
  const username = req.body.username;
  const hashPassword="";
  if (req.body.password){
    //hash the password
    const salt = await bcrypt.genSalt(10);
    hashPassword = await bcrypt.hash(req.body.password, salt);  
  }
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  
  User.findById(req.params.id)
    .then((user) => {
      if (username) user.username = username;
      if (hashPassword) user.password = hashPassword;
      if (firstname) user.firstname = firstname;
      if (lastname) user.lastname = lastname;

      user
        .save()
        .then(() => res.json("User updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
