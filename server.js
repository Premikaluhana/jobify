const express = require("express");
const Router = require("./Routers/userRouter");
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
  method: ["GET", "PATCH", "POST", "PUT", "DELETE"],
  credentials: true,
};
const app = express();
app.use(cors(corsOptions)); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Router);
app.use("/auth", Router);

app.listen(5000, () => {
  console.log("Listening port is 5000");
});