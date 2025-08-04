import { Schema, model } from "mongoose"

const shipSchema = new Schema(
	{
		origin: {
			type: String,
			required: true,
		},
		destination: {
			type: String,
			required: true,
		},
		shipment_number: {
			type: Number,
			required: true,
			unique: true,
		},
		hops: {
			type: [String],
			default: []
		}
	},
	{
		timestamps: true,
	}
)

export const Shipment = model("Shipment", shipSchema)
