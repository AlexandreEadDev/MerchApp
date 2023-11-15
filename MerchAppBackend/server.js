import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoute.js";
import orderRouter from "./Routes/orderRoutes.js";
import cors from "cors";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: ["https://merch-app-cyan.vercel.app", "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

// API
app.use("/api/products", productRoute);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

// ERROR
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 1000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
