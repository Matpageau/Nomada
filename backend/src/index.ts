import 'dotenv/config'
import express from "express"
import cors from 'cors'
import mongoose, { ConnectOptions } from "mongoose"
import cookieParser from 'cookie-parser'
import MainRouter from "./Routes/MainRouter"
import errorHandler from './middlewares/errorHandler'

const port = process.env.PORT || 3000

const app = express()
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", MainRouter)

app.use(errorHandler)

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