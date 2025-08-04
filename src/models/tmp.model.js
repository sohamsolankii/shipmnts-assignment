import { Schema, model } from "mongoose"

const tmpSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
		},
		feild: [
			{
				type: Schema.Types.ObjectId,
				ref: "Feild",
				default: [],
			},
		],
	},
	{
		timestamps: true,
	}
)

export const Tmp = model("Tmp", tmpSchema);
