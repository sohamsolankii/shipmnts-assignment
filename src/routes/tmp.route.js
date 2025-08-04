import Router from "express"
import {createTmp, getTmp} from "../controllers/tmp.controller"

const router = Router()

router.post("/create", createTmp)
router.get("/get", getTmp);

export default router
