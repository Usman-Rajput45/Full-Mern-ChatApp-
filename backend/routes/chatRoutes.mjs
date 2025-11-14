import express from "express"
import { getMessage } from "../controller/chatControl.mjs"

const router = express.Router()

router.get("/messages", getMessage)

export default router;