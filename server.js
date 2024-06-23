const express = require("express");
const Router = require("./Routers/userRouter");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Router);
app.use("/auth", Router);

app.listen(5000, () => {
  console.log("Listening port is 5000");
});