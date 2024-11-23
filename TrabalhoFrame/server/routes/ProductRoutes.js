const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Product = require('../models/Product')
const ProductImage = require('../models/ProductImage')
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.findAll({
            include: ProductImage 
        });
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products", error);
        res.status(400).json({ error: "Error fetching products" })
    }
})

router.get("/:id", async (req, res) => {
    try {
        const productId = req.params.id;    

        const productWithImages = await Product.findOne({
            where: { id: productId },
            include: ProductImage
        });

        if (!productWithImages) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        res.status(200).json(productWithImages);
    } catch (error) {
        console.error("Error fetching product", error);
        res.status(500).json({ error: "Erro ao buscar produto" });
    }
});


router.get("/:id/images", async (req, res) => {
    try {
        const productId = req.params.id;

        const productWithImages = await Product.findOne({
            where: { id: productId },
            include: ProductImage
        });

        if (!productWithImages) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        const images = productWithImages.ProductImages.map(image => image.url);
        res.status(200).json(images);
    } catch (error) {
        console.error("Error fetching product images", error);
        res.status(500).json({ error: "Erro ao buscar imagens do produto" });
    }
});

router.get("/detail/:id", async (req, res) => {
    try {
        const produtcId = req.params.id
        const product = await Product.findByPk(produtcId)

        if(!product) {
            return res.status(404).json({message: "Produto não encontrado"})
        }
        res.json(product)
    } catch (error) {
        console.log("Erro ao buscar produto", error)
    }
})


router.post("/add", async (req, res) => {
    try {
        const { model, brand, year, power, price, description, engine, images, quantity } = req.body;

        console.log("Received data:", req.body); 

        if (!model || !brand || !year || !power || !price || !description || !engine || !images || !quantity) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        }

        const existingProduct = await Product.findOne({ where: { model: model } });
        if (existingProduct) {
            const newQuantity = existingProduct.quantity + quantity
            await Product.update(
                { quantity: newQuantity },
                { where: { id: existingProduct.id } }
            )
            return res.status(200).json({ message: "Updated stock quantity" })
        } else {
            const newProduct = await Product.create({
                model,
                brand,
                year,
                power,
                price,
                description,
                engine,
                quantity
            });

       
            if (Array.isArray(images)) {
                await Promise.all(images.map(async (imageUrl) => {
                    await ProductImage.create({ url: imageUrl, productId: newProduct.id });
                }));
            }

            res.status(201).json(newProduct);
        }
    } catch (error) {
        console.error("Error adding product", error);
        return res.status(400).json({ error: "Error adding product" })
    }
});


router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.destroy({where: { id }})

        if(!product) {
            return res.status(404).json({ error: "Product not found"})
        }
        res.status(200).json({ message:  "Product deleted sucessfully" })

    } catch (error) {
        console.error("Error  deleting product", error);
        return res.status(500).json({ error: "Error deleting product" })

    }
});

router.put("/update/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { model, brand, year, power, price, description, engine, images, quantity } = req.body;

        if (!model || !brand || !year || !power || !price || !description || !engine || !quantity) {
            return res.status(400).json({ error: "Preencha todos os campos" });
        }

        const product = await Product.findByPk(id)
        if(!product) {
            return res.status(404).json({ error: "Product not found" })
        }

        await Product.update(   
            { model, brand, year, power, price, description, engine, quantity },
            { where: { id } }
        );

        
        await ProductImage.destroy({ where: { productId: id } });
        if (Array.isArray(images)) {
            await Promise.all(images.map(async (imageUrl) => {
                await ProductImage.create({ url: imageUrl, productId: id });
            }));
        }

        res.status(200).json({ message: "Product updated successfully" });
    } catch (error) {
        console.error("Error updating product", error)
        return res.status(500).json({ error: "Error updating product" })
    }
})

// Rota para atualizar imagens de um produto
router.put("/:id/images", async (req, res) => {
    try {
        const { id } = req.params;
        const { imagesToAdd, imagesToDelete } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        // Deletar imagens
        if (Array.isArray(imagesToDelete)) {
            await ProductImage.destroy({ where: { id: imagesToDelete } });
        }

        // Adicionar novas imagens
        if (Array.isArray(imagesToAdd)) {
            await Promise.all(imagesToAdd.map(async (imageUrl) => {
                await ProductImage.create({ url: imageUrl, productId: id });
            }));
        }

        res.status(200).json({ message: "Imagens atualizadas com sucesso" });
    } catch (error) {
        console.error("Error updating product images", error);
        return res.status(500).json({ error: "Erro ao atualizar imagens do produto" });
    }
});

// Rota para deletar uma imagem específica
router.delete("/:id/images/:imageId", async (req, res) => {
    try {
        const { id, imageId } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: "Produto não encontrado" });
        }

        const image = await ProductImage.findByPk(imageId);
        if (!image || image.productId !== id) {
            return res.status(404).json({ error: "Imagem não encontrada" });
        }

        await ProductImage.destroy({ where: { id: imageId } });
        res.status(200).json({ message: "Imagem deletada com sucesso" });
    } catch (error) {
        console.error("Error deleting product image", error);
        return res.status(500).json({ error: "Erro ao deletar imagem do produto" });
    }
});


module.exports = router;
