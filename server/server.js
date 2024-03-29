const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const morgan = require('morgan')
const connectDB = require("./config/db")


//dotenv
dotenv.config()

//mongo
connectDB();


//rest object
const app = express()

//middlewares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/v1/auth", require("./routes/userRoutes"));



// app.get('/', (req, res) => {
//     res.status(200).json({
//         success: true,
//         message: 'Welcome to full stack app',
//     })
// })



//port
const PORT = process.env.PORT || 8000;

//listen
app.listen(PORT, () => {
    console.log('Server is running')
})