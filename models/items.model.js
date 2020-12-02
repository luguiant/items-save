const { compare } = require("bcryptjs");
const { Sequelize, Model, where} = require("sequelize");
const db = require("./index");
const sequelize = db.sequelize;

class Items extends Model{}
Items.init(
    {
        id:{
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        names: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                max: 250,
                min: 3,
                is:{
                    args: /^[ a-zA-Z0-9#°áéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ,.;:()¿?¡!_-]+$/g,
                    msg: 'Solo puede ingresar letras, numeros y espacio'
                }
            }
        },
        quantity:{
            type: Sequelize.BIGINT,
            allowNull: false
        }, 
        is_active: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        secret: {
            allowNull: false,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        id_category:{
            type: Sequelize.BIGINT,
            allowNull: false
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }, 
    {
        sequelize,
        modelName: 'items'
    }
);


module.exports = Items;

module.exports.getAllItems = async () => {
    return await Items.findAll({attributes:['names', 'quantity', 'is_active', 'secret', 'createdAt']}).then(items => { return items});
}

module.exports.getItemBySecret = async (secret) => {
    return await Items.findAll({attributes:['names', 'quantity', 'is_active', 'secret', 'createdAt'], where: {secret}}).then(items => { return items;});
}
