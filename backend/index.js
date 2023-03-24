const express = require("express");
const cors = require("cors");
const prisonerRouter = require("./routes/prisoner");

const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.use("/api/prisoner", prisonerRouter);

app.listen(5000, () => console.log("Listening on 5000"));
