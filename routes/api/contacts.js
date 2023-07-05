const express = require("express");
const { contactCtrl } = require("../../controllers");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", contactCtrl.listContacts);

router.get("/:id", isValidId, contactCtrl.contactById);

router.post(
  "/",
  validateBody(schemas.validateContactsSchema),
  contactCtrl.addContact
);

router.delete("/:id", isValidId, contactCtrl.removeContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schemas.validateContactsSchema),
  contactCtrl.updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactCtrl.updateFavorite
);
module.exports = router;
