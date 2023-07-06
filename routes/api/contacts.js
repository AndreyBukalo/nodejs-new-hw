const express = require("express");
const { contactCtrl } = require("../../controllers");
const { validateBody, isValidId, authenticate } = require("../../middlewares");
const { schemas } = require("../../models/contact");
const router = express.Router();

router.get("/", authenticate, contactCtrl.listContacts);

router.get("/favorite=true" , authenticate,contactCtrl.favoriteContacts)

router.get("/:id", authenticate, isValidId, contactCtrl.contactById);

router.post(
  "/",
  authenticate,
  validateBody(schemas.validateContactsSchema),
  contactCtrl.addContact
);

router.delete("/:id", authenticate, isValidId, contactCtrl.removeContact);

router.put(
  "/:id",
  authenticate,
  isValidId,
  validateBody(schemas.validateContactsSchema),
  contactCtrl.updateById
);

router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  contactCtrl.updateFavorite
);
module.exports = router;
