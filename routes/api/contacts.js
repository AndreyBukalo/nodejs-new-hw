const express = require("express");
const contactCtrl = require("../../controllers");
const { validateBody } = require("../../middlewares");
const schema = require("../../schemas/");
const router = express.Router();

router.get("/", contactCtrl.listContacts);

router.get("/:contactId", contactCtrl.contactById);

router.post("/", validateBody(schema.contactSchema), contactCtrl.addContact);

router.delete("/:contactId", contactCtrl.removeContact);

router.put(
  "/:contactId",
  validateBody(schema.contactSchema),
  contactCtrl.updateById
);

module.exports = router;
