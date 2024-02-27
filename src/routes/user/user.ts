import express from 'express'
import userQuery from './user.query.js'
import userMutation from './user.mutation.js'


const router = express.Router();


router.use("/user", userMutation)
router.use("/user", userQuery)

export default router