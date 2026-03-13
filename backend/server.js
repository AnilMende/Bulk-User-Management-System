import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./config/db.js";
import errorHandler from "./utils/errorHandler.js";

import userRouter from "./routes/user.routes.js";


const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cors({
    origin : "http://localhost:3000",
    methods : ["GET", "PUT", "POST", "PATCH", "DELETE"],
    optionsSuccessStatus : 200
}));


app.get("/", (req, res) => {
    res.send("Server is Working");
})

//Errohandler
app.use(errorHandler);

//DB Connection
await connectDB();

app.use("/api/users", userRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));