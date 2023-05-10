import  express  from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import multer from "multer";

import Router from "./routes/index.js";
import cors from "cors";

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// app.use(cookieParser())
app.use(express.static("uploads"));


app.use("/api", Router)

mongoose.connect('mongodb://127.0.0.1:27017/NewFacebookDB',  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected!'));

app.listen((8000), ()=> {
    console.log("port run at 8000 ")
 })