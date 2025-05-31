import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connectDB.js";
import userRouter from "./router/user.route.js"
import companyRouter from "./router/company.route.js";
import jobRouter from "./router/job.route.js";
import applicationRouter from "./router/application.route.js";
import path from "path";


dotenv.config();
const app = express();
const PORT = 3000; 
connectDB();

const __dirname = path.resolve();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions ={
  origin: "https://career-path-hqsu.onrender.com",
  credentials: true,
}
app.use(cors(corsOptions));

//api's
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("/{*any}", (_,res) =>{
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
})

app.listen(PORT, () =>{
  console.log(`Server is running on port ${PORT}`);
});