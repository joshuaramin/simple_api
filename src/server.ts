import express from 'express'
import User from './routes/user/user.js'
import Product from './routes/products/product.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'


export const prisma = new PrismaClient();
const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(cors({
    credentials: true,
    origin: [ "http://localhost:3001" ]
}))

app.get("/", (req, res) => {
    res.send("hello world")
})

app.use(User)
app.use(Product)

app.listen({ port: process.env.PORT || 3001 }, () => {
    console.log("Server is running at port 3001")
})

