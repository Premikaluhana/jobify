const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/jobify");
const bycrpt = require("bcryptjs");
const userModel = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Lastname: {
    type: String,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  isverify: {
    type: Boolean,
    default: false,
  },
  Currdate: {
    type: Date,
    default: Date.now(),
  },
});
userModel.pre("save", async function (next) {
  const user = this
  if (!user.isModified("password")) {
    next();
  }
  const salt = await bycrpt.genSalt(12);
  const hashpass = await bycrpt.hash(user.password, salt);
  user.password = hashpass;
});
module.exports = mongoose.model("userRegister", userModel);