const express  = require("express");
const { body } = require("express-validator");
const itemsController = require("../controllers/item.controller");
const router = express.Router();
const categoryModel = require("../models/category.model");

router.post(
   "/save",
   [
      body("names")
         .exists()
         .withMessage("Names is required.")
         .matches(/^[ a-zA-Z0-9#°áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ,.;:()¿?¡!_-]+$/, "i")
         .withMessage("Names is alphanumeric.")
         .trim()
         .escape(), 
      body("quantity")
         .exists()
         .withMessage("quantity is required.")
         .matches(/^[0-9]+$/, "i")
         .withMessage("quantity is numeric.")
         .trim()
         .escape(),
      body("id_category")
         .exists()
         .withMessage("id_category is required.")
         .matches(/^[0-9]+$/, "i")
         .withMessage("id_category is numeric.")
         .custom((value, { req, loc, path }) => {
            return categoryModel.findOne({where: { id: value }}).then(typeDoc => {
                if (!typeDoc) {
                  return Promise.reject('La categoria no existe.');
                }
            });
          })
         .trim()
         .escape()
      
   ],
   itemsController.saveItem 
);

module.exports = router;
