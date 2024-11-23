const sequelize = require('../config/database')
const { DataTypes } = require('sequelize');
const User = require('./User')
const Product = require('./Product')

const ItemCart = sequelize.define('ItemCart', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onUpdate: 'CASCADE', // Atualiza quando o id de User muda
        onDelete: 'CASCADE', // Remove quando o User é excluído
    },

    productId: {
        type: DataTypes.INTEGER,
        references: {
            model:  Product,
            key: 'id',
        },
        onUpdate: 'CASCADE', // Atualiza quando o id de User muda
        onDelete: 'CASCADE', // Remove quando o User é excluído

    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    priceAll: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },

}) 

ItemCart.belongsTo(User, { foreignKey: 'userId '})
ItemCart.belongsTo(Product, { foreignKey:  'productId '})
User.hasMany(ItemCart, { foreignKey: 'userId' });
Product.hasMany(ItemCart, { foreignKey: 'productId' });


module.exports = ItemCart;