import 'dotenv/config';
import express from "express";

import config from "./utils/config.js";
import embedRoutes from "./routes/embedRoutes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ status: "ok", env: process.env.NODE_ENV || "development" });
});

app.use("/", embedRoutes);

const PORT = config.PORT;
app.listen(PORT, () => console.log(`devAPI is running on port ${PORT}`));