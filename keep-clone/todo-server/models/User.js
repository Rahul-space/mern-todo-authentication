const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password:{type: String,required:true},
    task: {type: Array,default: [{title:"Welcome",content:"Welcome to keep"}]}
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);