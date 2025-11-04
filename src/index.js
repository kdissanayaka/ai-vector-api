import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV || "development" });
});

app.listen(5000, () => console.log("devAPI is running on port 5000"));