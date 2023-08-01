const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Producto = sequelize.define('Producto', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull:false
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.STRING,
        allowNull:false
    }
});

Producto.associate = function(models) {
    Producto.belongsTo(models.User);
    Producto.belongsTo(models.Cart);
};


module.exports = Producto;