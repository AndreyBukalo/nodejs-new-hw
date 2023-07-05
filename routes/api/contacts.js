const express = require("express");
const contactCtrl = require("../../controllers");
const { validateBody, isValidId } = require("../../middlewares");
const schema = require("../../schemas/");
const router = express.Router();

router.get("/", contactCtrl.listContacts);

router.get("/:id", isValidId, contactCtrl.contactById);

router.post("/", validateBody(schema.contactSchema), contactCtrl.addContact);

router.delete("/:id", isValidId, contactCtrl.removeContact);

router.put(
  "/:id",
  isValidId,
  validateBody(schema.contactSchema),
  contactCtrl.updateById
);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schema.updateFavoriteSchema),
  contactCtrl.updateFavorite
);
module.exports = router;
