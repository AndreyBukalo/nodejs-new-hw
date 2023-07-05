const bcrypt = require("bcrypt");
const { User } = require("../../models/user");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { SECRET } = process.env;

const { HttpError, ctrlWrapper } = require("../../helpers");

const registration = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email alredy exist");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET, { expiresIn: "23h" });
  res.send(token);
};
module.exports = {
  registration: ctrlWrapper(registration),
  login: ctrlWrapper(login),
};
