const { User } = require("../../models/user");

const { HttpError, ctrlWrapper } = require("../../helpers");

const registration = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email alredy exist");
  }
  const newUser = await User.create(req.body);

  res.status(201).json({ email: newUser.email });
};

module.exports = {
  registration: ctrlWrapper(registration),
};
