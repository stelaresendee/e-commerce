const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/AuthRoutes');
const productRoutes = require('./routes/ProductRoutes');
const ProductImage = require('./models/ProductImage')
const cartRoutes = require('./routes/CartRoutes')
const orderRoutes = require('./routes/OrderRoutes')

const app = express();
app.use(cors());

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/auth', authRoutes)
app.use('/products', productRoutes)
app.use('/cart',  cartRoutes)
app.use('/order',  orderRoutes)







const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))