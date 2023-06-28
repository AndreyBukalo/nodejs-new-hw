const Contact = require("../../models/contact");

const { HttpError, ctrlWrapper } = require("../../helpers");

const listContacts = async (req, res) => {
  const allContacts = await Contact.find({}, "-createdAt updatedAt");
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
  const newContact = await Contact.create(req.body);
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
  contactById: ctrlWrapper(contactById),
  addContact: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
  removeContact: ctrlWrapper(removeContact),
};
