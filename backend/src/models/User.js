const DataTypes = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING,
    },
    salt: {
        type: DataTypes.STRING,
    }

});

User.associate = function(models) {
    User.hasMany(models.Producto);
};

module.exports = User;