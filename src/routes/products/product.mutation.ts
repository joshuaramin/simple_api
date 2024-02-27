import express from 'express'
import { prisma } from '../../server.js';
import jwt from 'jsonwebtoken';

const { verify } = jwt


const router = express.Router();


router.post("/createProducts", async (req, res) => {

    const { name, brand, price, quantity, descriptions, userID } = req.body

    const verified = verify(req.cookies[ "it_token" ], "ITELEC2", {
        algorithms: [ "HS256" ]
    })
    if (!verified) {
        throw new Error("You need to Singed in first")
    } else {
        const products = await prisma.product.create({
            data: {
                name, brand, price: parseFloat(price), quantity: parseInt(quantity), descriptions,
                User: {
                    connect: {
                        userID
                    }
                }
            }
        })

        res.json(products)
    }
})


router.delete("/deleteProductById/:id", async (req, res) => {
    const products = await prisma.product.delete({
        where: {
            productID: req.params.id
        }
    })

    res.json(products)
})

router.patch("/updateProductById/:id", async (req, res) => {

    const { name, brand, price, quantity, descriptions } = req.body;

    const products = await prisma.product.update({
        data: {
            name, brand, price: parseFloat(price), quantity: parseInt(quantity), descriptions
        },
        where: {
            productID: req.params.id
        }
    })

    res.json(products)

})

export default router