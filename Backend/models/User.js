// const mongoose=require("mongoose");
// const bcrypt=require("bcryptjs");
// const userSchema=new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         trim:true,
//     },
//     email:{
//         type:String,
//         unique:true,
//         required:true,
//         trim:true,
//     },
//     password:{
//         type:String,
//         required:true,
//     },
// },{timestamps:true});
// userSchema.pre('save',async function(next){
//     if(!this.isModified('password')) return next();
//     const salt=await bcrypt.genSalt(10);
//     this.password=await bcrypt.hash(this.password,salt);
//     next();
// });
// userSchema.methods.matchPassword=async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword,this.password);
// };
// // module.exports=mongoose.model('User',userSchema);
// const User = mongoose.model("User", userSchema);

// export default User;
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with hashed one
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
