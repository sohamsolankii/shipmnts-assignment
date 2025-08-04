import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import shipRoutes from "./routes/shipments.route.js"

dotenv.config({ path: './.env' })
const app = express()
const PORT = process.env.PORT;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/shipments/", shipRoutes)


app.get("/", (req, res) => {
	res.send("Welcome to Shipmnt API")
})

app.listen(PORT, () => {
	connectDB()
	console.log(`Server is running on port: ${PORT}`)
})

