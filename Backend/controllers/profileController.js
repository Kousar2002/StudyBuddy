// const Profile = require("../models/Profile");
// exports.createOrUpdateProfile=async(req,res)=>{
//     const {interests,preferredStudyTime,durationInHours}=req.body;
//     try{
//         const profileFields={
//             user:req.user.id,
//             interests,
//             preferredStudyTime,
//             durationInHours,
//         };
//         let profile=await Profile.findOne({user:req.user.id});
//         if(profile){
//             profile=await Profile.findOneAndUpdate(
//                 {user:req.user.id},
//                 {$set:profileFields},
//                 {new:true}
//             );
//             return res.json(profile);
//         }
//         profile=new Profile(profileFields);
//         await profile.save();
//         res.json(profile);
//     }catch (err){
//        console.error(err.message);
//     res.status(500).json({ message: "Server error" });
//     }
// }
// exports.getMatches=async(req,res)=>{
//   try{
//     const userProfile=await Profile.findOne({user:req.user.id});
//     if(!userProfile){
//       return res.status(404).json({message:"Profile not found"});
//     }
//     const matches=await Profile.find({
//       user:{$ne:req.user.id},
//       interests:{$in:userProfile.interests}
//     }).populate("user");
//     res.json(matches);
//   }catch (err){
//     console.error(err.message);
//     res.status(500).json({message:"server error"})
//   }
// }
// exports.getMyProfile=async(req,res)=>{
//   const profile = await Profile.findOne({ user: req.user.id }).populate('user', 'name email');
//   if (!profile) {
//     return res.status(404).json({ message: 'Profile not found' }); // This is your 404
//   }

//   res.json(profile);
// }

import Profile from "../models/Profile.js";

export const createOrUpdateProfile = async (req, res) => {
  const { interests, preferredStudyTime, durationInHours } = req.body;
  try {
    const profileFields = {
      user: req.user.id,
      interests,
      preferredStudyTime,
      durationInHours,
    };

    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFields);
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMatches = async (req, res) => {
  try {
    const userProfile = await Profile.findOne({ user: req.user.id });
    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    const matches = await Profile.find({
      user: { $ne: req.user.id },
      interests: { $in: userProfile.interests },
    }).populate("user");

    res.json(matches);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "server error" });
  }
};

export const getMyProfile = async (req, res) => {
  const profile = await Profile.findOne({ user: req.user.id }).populate(
    "user",
    "name email"
  );
  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.json(profile);
};
