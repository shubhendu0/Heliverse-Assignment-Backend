require("dotenv").config();
const connectDb = require('./connection/connection');
connectDb();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoutes");
const teamRoute = require("./routes/teamRoutes");

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:3000" ],
    credentials: true,
  })
)

// Routes
app.use("/api/users", userRoute);
app.use("/api/team", teamRoute);

const port = process.env.PORT || 8000;
app.listen(port , (err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(`Server running at port ${port}`);
    }
});