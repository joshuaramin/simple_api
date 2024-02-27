import express from 'express'
import { prisma } from '../../server.js'



const router = express.Router()

router.get("/getAllUserCustomer", async (req, res) => {
    const users = await prisma.user.findMany({
        where: {
            role: "customer"
        }
    })


    res.json(users)
})


router.get("/getUserByAccount/:id", async (req, res) => {
    const users = await prisma.user.findFirst({
        where: {
            userID: req.params.id
        }
    })

    res.json(users)
})

export default router