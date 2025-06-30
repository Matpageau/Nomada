import 'dotenv/config'
import express from "express"
import mongoose, { ConnectOptions } from "mongoose"
import MainRouter from "./Routes/MainRouter"

const port = process.env.PORT || 3000
const app = express()

app.use("/", MainRouter)

const uri = process.env.DATABASE_URL!;
const clientOptions: ConnectOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true }
};

mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("Connected to database")
  })
  .catch((err) => {
    console.error("Error while connecting to MongoDB", err)
  })

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})