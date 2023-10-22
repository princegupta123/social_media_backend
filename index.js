import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes/index.js";
import cookieParser from "cookie-parser";
 dotenv.config();
const PORT = process.env.PORT || 3008;
import db from "./models/index.js";
const app = express();

//middlewares
app.use(bodyParser.urlencoded({extended: true, limit : '50mb'}));
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/v1", router);

app.get("/", (req, res)=>{
  res.send('hello')
})
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
