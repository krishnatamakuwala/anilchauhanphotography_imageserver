const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");

const imagesRoute = require("./routes/images");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/images", imagesRoute);

app.listen(process.env.PORT || 3030, () => console.log("Server up and running"));