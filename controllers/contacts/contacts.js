const { Contact } = require("../../models/contact");

const { HttpError, ctrlWrapper } = require("../../helpers");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
  const allContacts = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(allContacts);
};


const favoriteContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const allContacts = await Contact.find({ favorite:true, owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(allContacts);
};


const contactById = async (req, res) => {
  const { id } = req.params;
  const contactById = await Contact.findById(id);
  if (!contactById) {
    throw HttpError(404, "Not found");
  }
  res.json(contactById);
};

const addContact = async (req, res) => {
  const { _id: owner } = req.user;
  const newContact = await Contact.create({ ...req.body, owner });
  res.status(201).json(newContact);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not Found");
  }
  res.json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const updatedContact = await Contact.findByIdAndUpdate(id, data, {
    new: true,
  });
  if (!updatedContact) {
    throw HttpError(404, "Not Found");
  }
  res.json(updatedContact);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const contactById = await Contact.findByIdAndRemove(id);
  if (!contactById) {
    throw HttpError(404, "Not Found");
  }
  res.json(contactById);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  favoriteContacts:ctrlWrapper(favoriteContacts),
  contactById: ctrlWrapper(contactById),
  addContact: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  removeContact: ctrlWrapper(removeContact),
};
