const { validationResult } = require('express-validator');
const db = require("../models/index");
const sequelize = db.sequelize;

const Items = require("../models/items.model");

exports.saveItem = (req, res, next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed.');
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }    

    const names = req.body.names;
    const quantity = req.body.quantity;
    const is_active = 1;
    const id_category = req.body.id_category;
    
    sequelize.transaction(async t=> {
        return await Items.create({names,quantity,is_active,id_category});
    }).then( data => {
        res.status(201).json({ status: 'success', message:'Item create!'});
    }).catch( error => {
        res.status(500).json({ status: 'fail', message: error});
    });
};