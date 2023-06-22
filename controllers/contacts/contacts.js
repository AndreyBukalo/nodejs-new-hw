const contacts = require('../../models/contacts');

const { HttpError, ctrlWrapper } = require('../../helpers');

const listContacts = async (req, res) => {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
}

const contactById = async (req, res) => {
    const { contactId } = req.params;
    const contactById = await contacts.getContactById(contactId);
    if (!contactById) {
        throw HttpError(404, "Not found")
    }
    res.json(contactById);
};

const addContact = async (req, res) => {
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const data = req.body;
  const updatedContact = await contacts.updateContact(contactId, data);
  if (!updatedContact) {
    throw HttpError(404, "Not Found")
  }
  res.json(updatedContact);
}

  const removeContact = async (req, res) => {
    const { contactId } = req.params;
      const contactById = await contacts.removeContact(contactId);
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
    removeContact: ctrlWrapper(removeContact),
  };