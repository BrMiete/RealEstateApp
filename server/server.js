const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')

require('./config/mongoose.config')

app.use(cors({credentials: true, origin: "http://localhost:3000"}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const {oAuthRouter} = require("./routes/oauth.routes")
app.use("/api/", oAuthRouter)

const {estateRouter} = require("./routes/estate.routes")
app.use("/api/", estateRouter)

const {multerRouter} = require("./routes/multer.routes")
app.use("/api/", multerRouter)

app.use('/static', express.static('uploads'));

app.listen(8000, () =>{
    console.log("Listening at Port 8000")
})