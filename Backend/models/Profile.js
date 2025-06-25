// const mongoose=require("mongoose");
// const ProfileSchema=new mongoose.Schema({
//     user:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required:true,
//         unique:true
//     },
//    interests:{
//     type:[String],
//     required:true,
//    },
//    preferredStudyTime:{
//     start:{type:String,required:true},
//     end:{type:String,required:true},
//    },
//    durationInHours:{
//     type:Number,
//     required:true,
//     min:0.5,
//     max:12,
//    }
// })
// // module.exports=mongoose.model("Profile",ProfileSchema)
// const Profile = mongoose.model("Profile", profileSchema);
// export default Profile;
import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  interests: {
    type: [String],
    required: true,
  },
  preferredStudyTime: {
    start: { type: String, required: true },
    end: { type: String, required: true },
  },
  durationInHours: {
    type: Number,
    required: true,
    min: 0.5,
    max: 12,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
