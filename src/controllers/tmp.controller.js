import { Tmp } from "../models/tmp.model.js"
import { ApiResponse } from "../utils/ApiResponse.js"

export const createTmp = async(req, res) => {
	try{
		const { name, email } = req.body;

		const userExists = await Tmp.findOne({ email })

		if (userExists) {
			return res
				.status(400)
				.json(new ApiResponse(400, {}, "User already exists"))
		}

		const user = await Tmp.create({
			name,
			email
		})

		await user.save();

		return res
			.status(200)
			.json(
				new ApiResponse(200, user, "User created successfully")
			)

	}catch(err) {
		console.error(err)
		return res.status(500).json(new ApiResponse(500, {}, err.message))
	}
}

export const getTmp = async(req, res) => {
	try {
		// const { id } = req.params
		// const tmp = await Tmp.findById(id)
		// if (!tmp) {
		// 	return res
		// 		.status(404)
		// 		.json(new ApiResponse(404, {}, "Teacher not found"))
		// }
		
		const users = await Tmp.find();
		return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
		
	} catch (err) {
		console.error(err);
		return res.status(500).json(new ApiResponse(500, {}, err.message));
	}
}