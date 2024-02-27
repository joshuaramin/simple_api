import express from 'express'
import bcrypt from 'bcrypt'
import { prisma } from '../../server.js';
import jwt from 'jsonwebtoken';

const { sign } = jwt

const router = express();

router.post("/createUserCustomerAccount", async (req, res) => {

    const { username, password, } = req.body


    const pass = await bcrypt.hash(password, 12)

    const users = await prisma.user.create({
        data: {
            username,
            password: pass,
            role: "customer",
        }
    })

    res.json(users)
})


router.post("/createAdminAccount", async (req, res) => {

    const { username, password, } = req.body


    const pass = await bcrypt.hash(password, 12)

    const users = await prisma.user.create({
        data: {
            username,
            password: pass,
            role: "admin",
        }
    })

    res.json(users)
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body


    const users = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if (!users) throw new Error("There is no existing User");


    const comparePass = await bcrypt.compare(password, users.password);

    if (!comparePass) throw new Error("Password is mismatched")


    const token = sign({ userId: users.userID, role: users.role }, "ITELEC2", {
        algorithm: "HS256"
    })

    res.cookie("it_token", token)
    res.json(token)
})

export default router