import mongoose from "mongoose"

const connectDB = async () => {
	try {
		const mongoURI = process.env.MONGODB_URI
		if (!mongoURI) {
			throw new Error(
				"MONGODB_URI is not defined in the environment variables"
			)
		}
		const connectionInstance = await mongoose.connect(mongoURI)
		console.log(`MongoDB connected!`)
	} catch (error) {
		console.error("MongoDB Connection Error:  ", error)
	}
}

export default connectDB
