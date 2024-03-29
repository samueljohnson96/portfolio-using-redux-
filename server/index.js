import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import hotelRoutes from "./routes/route.js";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import shortid  from "shortid";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// for setting up razorpay
export const razorpay = new Razorpay({
  key_id: process.env.RAZOR_KEY_ID,
  key_secret: process.env.RAZOR_KEY_SECRET,
});

// sholud be called after initializing cors to avoid cors origin issue
app.use("/hotelin", hotelRoutes);

// for database
const connectionUrl = `mongodb://localhost:27017/hotelin?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5000;

mongoose
  .connect(connectionUrl, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port : ${PORT}`))
  )
  .catch((err) => console.log(err));

mongoose.set("useFindAndModify", false);
