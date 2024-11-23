const sequelize = require('./config/database')
const Product = require('./models/Product')
const User = require('./models/User')
const ItemCart = require('./models/ItemCart')
const ProductImage = require('./models/ProductImage')
const Order = require('./models/Order')

sequelize.sync({ force: true }).then(() => {
    console.log('Synced database')
}).catch((error) => {
    console.error('Erro ao sincronizar banco de dados: ', error)
})