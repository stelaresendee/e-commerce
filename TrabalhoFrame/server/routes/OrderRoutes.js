// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Criar novo pedido
router.post('/add', async (req, res) => {
    try {
        const { userId, productIds, totalPrice } = req.body;

        if (!userId || !productIds || !totalPrice) {
            return res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
        }

        const newOrder = await Order.create({
            userId,
            productIds,
            totalPrice,
            status: 'Aguardando pagamento'
        });

        res.status(201).json(newOrder);
    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        res.status(500).json({ error: "Erro ao criar pedido." });
    }
});

// Obter todos os pedidos de um usuário
router.get('/user/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        const order = await Order.findAll({
            where: { userId },
            order: [['date', 'DESC']]
        });
        res.status(200).json(order);
    } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        res.status(500).json({ error: "Erro ao buscar pedidos." });
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.findAll({
            order: [['date', 'DESC']]
        });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
        res.status(500).json({ error: "Erro ao buscar pedidos." });
    }
});

// Atualizar status do pedido
router.put('/:orderId/status', async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findByPk(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Pedido não encontrado.' });
        }

        order.status = status;
        await order.save();

        res.status(200).json({ message: 'Status do pedido atualizado com sucesso.', order });
    } catch (error) {
        console.error("Erro ao atualizar status do pedido:", error);
        res.status(500).json({ error: "Erro ao atualizar status do pedido." });
    }
});

module.exports = router;
