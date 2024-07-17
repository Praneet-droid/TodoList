const express = require("express");

const mongoDbConnection =require('./connection/mongoDb')
const app = express();

const PORT = 8000;
const userRouter= require('./routes/user')
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
mongoDbConnection();

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/',userRouter);

app.listen(PORT, () => {
  console.log(`Server Started At Port ${PORT}`);
});