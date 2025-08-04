import { Flight } from "../models/flight.model.js"
import { Shipment } from "../models/shipments.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"

export const createShip = async (req, res) => {
	try {
		const { origin, destination, shipment_number } = req.body

		if(!shipment_number){
			return res
				.status(400)
				.json(
					new ApiResponse(
						400,
						{},
						"shipments numer is required!"
					)
				)
		}
		const snumber = await Shipment.findOne({
			shipment_number: shipment_number,
		})

		if (snumber) {
			return res
				.status(400)
				.json(new ApiResponse(400, {}, "shipment number must be unique"))
		}

		if(!origin || !destination){
			return res
				.status(400)
				.json(
					new ApiResponse(
						400,
						{},
						"Origin and destination are required fields."
					)
				)
		}

		Shipment.hops = [origin, destination];

		const ship = await Shipment.create({
			shipment_number,
			destination,
			origin,
			hops: Shipment.hops,
		})

		await ship.save()

		return res
			.status(200)
			.json(new ApiResponse(200, ship, "Shipment created successfully"))
	} catch (err) {
		console.error(err)
		return res.status(500).json(new ApiResponse(500, {}, err.message))
	}
}


export const addHops = async (req, res) => {
	try {
		const { shipment_number } = req.params
		const { previous_hop, next_hop, new_hop } = req.body

		const shipId = await Shipment.findOne({
			shipment_number: shipment_number,
		})
		if (!shipId) {
			return res
				.status(404)
				.json(new ApiResponse(404, {}, "Ship id is not found"))
		}

		if (!previous_hop || !next_hop || !new_hop) {
			return res
				.status(400)
				.json(
					new ApiResponse(
						400,
						{},
						"Origin and destination and new hop detials are required fields."
					)
				)
		}

		// console.log(shipId)
		// console.log(shipId._id)

		const doc = await Shipment.findById({_id: shipId._id.toString()});
		if (!doc) {
		  return res.status(404).json(new ApiResponse(404, {}, "Not found"));
		}

		// console.log(doc)

		const index = doc.hops.indexOf(previous_hop)
	
		doc.hops.splice(index + 1, 0, new_hop)


		await doc.save();

		return res
			.status(200)
			.json(
				new ApiResponse(200, doc, "Shipment created successfully")
			)
	} catch (err) {
		console.error(err)
		return res.status(500).json(new ApiResponse(500, {}, err.message))
	}
}

export const getShip = async(req, res) => {
	try {
		
		const users = await Shipment.find();
		return res.status(200).json(new ApiResponse(200, users, "Ships fetched successfully"));
		
	} catch (err) {
		console.error(err);
		return res.status(500).json(new ApiResponse(500, {}, err.message));
	}
}


export const addFlight = async(req, res) => {
	try{
		const { shipment_number } = req.params
		const { carrier, from, to, flight_number,departure, arrival } = req.body

		const shipId = await Shipment.findOne({
			shipment_number: shipment_number,
		})
		if (!shipId) {
			return res
				.status(404)
				.json(new ApiResponse(404, {}, "Ship id is not found"))
		}

		if(!to || !from || !flight_number){
			return res
				.status(404)
				.json(new ApiResponse(404, {}, "all ness details must be feild"))
		}

		const flightId = await Flight.findOne({
			flight_number: flight_number,
		})

		if(flightId){
			return res
				.status(404)
				.json(new ApiResponse(404, {}, "Flight number is must be unique, you can only use one time!"))
		}

		const flight = await Flight.create({
			carrier,
			from,
			to,
			flight_number,
			departure,
			arrival,
		})
		await flight.save();

		return res
			.status(200)
			.json(new ApiResponse(200, flight, "User created successfully"))

	}catch(err) {
		console.error(err)
		return res.status(500).json(new ApiResponse(500, {}, err.message))
	}
}
