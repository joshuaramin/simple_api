import express from 'express'
import { prisma } from '../../server.js';


const router = express.Router();

router.get("/getAllProducts", async (req, res) => {
    const products = await prisma.product.findMany();

    res.json(products)
})

router.get("/getProductById/:id", async (req, res) => {
    const products = await prisma.product.findFirst({
        where: {
            productID: req.params.id
        }
    })

    res.json(products)
})

export default router