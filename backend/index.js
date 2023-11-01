import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";

import employeeRouter from "./routes/employees.js"
import authRouter from "./routes/auth.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/employee", employeeRouter)
app.use("/employee/auth", authRouter)

mongoose
    .connect(process.env.urlMongo)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server listen on port ${process.env.PORT}`);
        });
    })
    .catch((error) => console.error(error));
