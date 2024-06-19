const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const { user } = require('../routes/userRoutes')

// post /api/users/register
const registerUser = asyncHandler(async (req,res) => {
    console.log("got it");
    const { name,email,password } = req.body;
    console.log(name,email,password);
    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user exist
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)

    //create user
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    })

    if(user){
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data')
    }
})

// post /api/users/login
const loginUser = asyncHandler(async (req,res) => {
    const {email,password} = req.body;
    
    //check for user email
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){

        if(user.isBlocked === true){
            res.status(403).json({ message: "User is blocked." });
        }
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            profileURL: user.profileURL,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

// const getMe = asyncHandler(async (req,res) => {
//     const { email,name } = req.body
//     console.log(email,name);
//     const user = await User.findById(req.user.id)
//     console.log('inside backend')
//     console.log(user)
//     // console.log("token", req.token);
//     if(!user){
//         res.status(400).json({message: 'User not found'})
//     }
//     user.name = name || user.name
//     user.email = email || user.email
//     const updateUser = await user.save()
//     console.log('update user')
//     console.log(updateUser)
//     // const updateUser = await User.findByIdAndUpdate(req.params.id , req.body)
//     res.status(200).json({
//         _id:updateUser.id,
//         name:updateUser.name,
//         email:updateUser.email,
//     })
// })

const getMe = asyncHandler(async (req, res) => {
    const { email, name, image } = req.body; 

    // Find the user by ID
    const user = await User.findById(req.user.id);

    // Check if the user exists
    if (!user) {
        return res.status(400).json({ message: 'User not found' });
    }

    // Update user fields if provided in the request body
    if (name) user.name = name;
    if (email) user.email = email;
    if (image) user.profileURL = image;

    // Save the updated user object
    const updatedUser = await user.save();
    console.log("kdfghsjdgfs",updatedUser);
    // Return the updated user object in the response
    res.status(200).json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        profileURL: updatedUser.profileURL, // Updated profile URL
    });
});

const generateToken = (id) => {
    return jwt.sign({ id},process.env.JWT_SECRET,{
        expiresIn: '30d',
    })
}


//image uploading
// const uploadProfile = asyncHandler(async(req,res)=>{
//     const imgUrl = req.body.imgUrl;
//     console.log(imgUrl);
//     try {
//         const user = await User.findByIdAndUpdate(req.user.id,
//         {profileURL : req.body.imgUrl},
//             {new:true}
//     )
//     res.json(user)
//     } catch (error) {
//         console.error("Error updating user profile:", error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// })


module.exports = {
    registerUser,
    loginUser,
    getMe,
    // uploadProfile
}