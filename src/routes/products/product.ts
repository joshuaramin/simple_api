import express from 'express'
import ProductQuery from './product.query.js'
import ProductMutation from './product.mutation.js'

const router = express.Router()

router.use("/product", ProductQuery)
router.use("/product", ProductMutation)


export default router