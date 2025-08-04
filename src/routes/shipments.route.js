import Router from "express"
import {
	createShip,
	addHops,
	getShip,
	addFlight,
} from "../controllers/shipments.controller.js"

const router = Router()

// create shipmnt
router.post("/create", createShip)

// add hop
router.post("/:shipment_number/hops/add", addHops)


// get shipmnt
router.get("/get", getShip)

// add flight
router.post("/:shipment_number/flights/add", addFlight)

export default router
