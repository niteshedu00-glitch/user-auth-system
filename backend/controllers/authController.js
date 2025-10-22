import User from "../models/User.js";
import bcrypt from "bcryptjs";
import genrateToken from "../utils/genrateToken.js";


export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const exist = await User.findOne({ email });
        if (exist) return res.status(400).json({ message: "User already exists"});

        const user = await User.create({name,email,password});
        genrateToken(res, user._id);
        res.status(201).json({_id: user._id, name: user.name, email: user.email});

    }catch (err) {
        res.status(500).json({message: err.message});
    }
};

export const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try{
        const user =await User.findOne({email});
        if(!user) return res.status(404).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(401).json({message: "Invalid credentials"});

        genrateToken(res, user._id);
        res.json({_id: user._id, name: user.name, email: user.email});

    }catch (err) {
        res.status(500).json({message: err.message});
    }
};

export const logoutUser = (req, res) =>{
    res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
    res.json({ message: "Logged out"});
};