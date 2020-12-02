const { compare } = require("bcryptjs");
const { Sequelize, Model, where} = require("sequelize");
const db = require("./index");
const sequelize = db.sequelize;

class Category extends Model{}

Category.init(
    {
        id:{
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
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
        secret: {
            allowNull: false,
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE
    }, 
    {
        sequelize,
        modelName: 'categories'
    }
);


module.exports = Category;