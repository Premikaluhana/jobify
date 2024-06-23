const express = require("express");
const Router = express();
const userModel = require("../schemaModel/userModel");
const validation = require("../validate/validation");
const loginvalidate = require("../validate/loginvalidation");
const nodemailer = require("nodemailer");
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "jobifyproject";
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "premikaluhana@gmail.com",
    pass: "ycmzqhodtwxblbkl",
  },
});
Router.post("/register", async (req, res) => {
  try {
    await validation.validateAsync(req.body);
    const { Name, Lastname, Location, email, password } = req.body;
    const Checkuser = await userModel.findOne({ email });
    if (Checkuser) {
      res.status(500).json({ msg: "User already exist plz login" });
    } else {
      const otp = Math.floor(100000 + Math.random() * 900000);
      const Createuser = await userModel.create({
        Name,
        Lastname,
        Location,
        email,
        password,
        otp,
      });
      const userId = Createuser._id;
      const token = jwt.sign({ userId }, secret);
      const mailOptions = {
        from: "premikaluhana@gmail.com",
        to: email,
        subject: "Verify your account",
        html: `<h2>Here is your otp:<h2>${otp}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.status(200).json({ msg: "successfully signup", info, token });
        }
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});
Router.patch("/verify", async (req, res) => {
  try {
    const { otp } = req.body;
    const userVerify = await userModel.updateOne(
      { otp },
      { $set: { isverify: true } }
    );
    res.status(200).json(userVerify);
  } catch (error) {
    res.status(400).json({ err: error });
  }
});
Router.post("/login", async (req, res) => {
  try {
    await loginvalidate.validateAsync(req.body);
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      const checkPass = bycrpt.compareSync(password, user.password);
      if (checkPass) {
        let userId = user._id;
        const token = jwt.sign({ userId }, secret);
        res
          .status(200)
          .json({ msg: "Logged In", token, verified: user.isverify });
      } else {
        res.status(400).json({ msg: "invalid email Or password" });
      }
    }
  } catch (error) {
    res.status(400).json({ msg: "invalid email Or password" });
  }
});
// Forget and update password

Router.post("/forgetpass", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(200).json({ msg: "check your email" });
    } else {
      const mailOptions = {
        from: "premikaluhana@gmail.com",
        to: email,
        subject: "Change Your Password",
        html: `<a href="${user._id}">change</a>`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          res.status(200).json({ msg: "successfully signup", info, token });
        }
      });
    }
  } catch (error) {
    res.status(400).json({ msg: "check your email", err: error });
  }
});
Router.patch("/updatepassword", async (req, res) => {
  try {
    const { userId, newpassword } = req.body;
    const salt = await bycrpt.genSalt(12);
    const hashpass = await bycrpt.hash(newpassword, salt);
    const user= await userModel.updateOne({userId},{$set:{password:hashpass}})
    if(user){
      res.status(200).json({msg:"your password is updated"})
    }
  } catch (error) {
    res.status(400).json({err:error})
  }
});
module.exports = Router;