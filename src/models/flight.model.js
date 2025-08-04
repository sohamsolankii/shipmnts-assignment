import { Schema, model } from "mongoose"

const flightSchema = new Schema(
	{
		carrier: {
			type: String,
		},
		from: {
			type: Schema.Types.ObjectId,
			ref: "Shipment",
			unique: true,
		},
		to: {
			type: Schema.Types.ObjectId,
			ref: "Shipment",
			unique: true,
		},
		flight_number: {
			type: String,
			unique: true,
			require: true,
		},
		departure: {
			type: Date,
		},
		arrival: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
)

export const Flight = model("Flight", flightSchema)
