const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcryptjs");

//update user
exports.updateUser = async (req, res) => {
  const { userId } = req.body;
  if (userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { ...req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("you can update only your account");
  }
};

//delete user
exports.deleteUser = async (req, res) => {
  const { userId } = req.body;
  if (userId === req.params.id) {
    try {
      const user = User.findById(req.params.id);
      await Post.delete({ username: user.username });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been deleted...");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(401).json("you can delete only your account");
  }
};

//Get user
exports.getUser = async (req,res) =>{
  try {
    const user = await User.findById(req.params.id);
    const {password,...others}= user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
}
