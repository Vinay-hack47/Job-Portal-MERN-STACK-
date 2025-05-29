import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import userRouter from "./router/user.route.js"
import companyRouter from "./router/company.route.js";
import jobRouter from "./router/job.route.js";
import applicationRouter from "./router/application.route.js";


dotenv.config();
const app = express();

const PORT = 3000; 
connectDB();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions ={
  origin: "http://localhost:5173",
  credentials: true,
}
app.use(cors(corsOptions));

//api's
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.listen(PORT, () =>{
  console.log(`Server is running on port ${PORT}`);
})