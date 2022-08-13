const User = require("../models/User");
var bcrypt = require("bcryptjs");

//register user
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let existantUser = await User.findOne({email});
    if(existantUser) return res.status(402).json({msg:'user already exists'})
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password,salt);
    const newUser = new User({
      username,
      email,
      password: hashedPass,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

//login user
exports.login = async(req,res) =>{
// const {email,password}=req.body;
    try {
        let existantUser = await User.findOne({username:req.body.username});
        if(!existantUser)  return res.status(400).json({msg:'bad credentials'});
        let isMatch = await bcrypt.compare(req.body.password,existantUser.password);
        if(!isMatch) return res.status(400).json({msg:'bad credentials'});
        const {password, ...others} = existantUser._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}
