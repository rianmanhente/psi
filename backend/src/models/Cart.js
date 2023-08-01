const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const Cart = sequelize.define('Cart', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

Cart.associate = function(models) {
    Cart.hasMany(models.Producto);
};

module.exports = Cart;