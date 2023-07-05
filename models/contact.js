const { Schema, model } = require('mongoose');
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");


const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, { versionKey: false, timestamps: true });



const validateContactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean()
    .required()
    .messages({ "any.required": "missing favorite field" }),
});





contactSchema.post('save' , handleMongooseError)

const Contact = model("contact", contactSchema)


const schemas = {
  validateContactsSchema,
  updateFavoriteSchema,
};

module.exports = {
  Contact,
  schemas
};
