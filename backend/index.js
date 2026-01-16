import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
import Contact from "./models/Contact.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import Admin from "./models/Admin.js"
import authMiddleware from "./middleware/auth.js";


dotenv.config();
const app = express();



app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));



mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("db connected");
})
.catch((err) => {
    console.log("db connection failed",err);
})

app.post("/contact", async (req,res) => {
    try{
        const{name,message} = req.body;

        const newContact = new Contact({
            name,
            message,
        });

        await newContact.save();

        console.log("data saved", newContact);
        res.status(201).json({message:"data saved"});
    }catch(error){
        console.error(error);
    res.status(500).json({ message: "Failed to save data" });
    }
});

app.post("/admin/login",async (req,res) =>{
    const {username,password} = req.body;
    try{
        const admin = await Admin.findOne({username});
        if(!admin){
            return res.status(401).json({message:"invalid user"});
        }
        const isMatch = await bcrypt.compare(password,admin.password);
        if(!isMatch){
             return res.status(401).json({message:"invalid user"});
        }

        const token = jwt.sign(
            {
                id: admin._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"1h"
            }
        );

        res.json({token})
    }catch(err){
        res.status(500).json({ message: "Login failed" });
    }
})

app.get("/admin/dashboard", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

app.get("/admin/contacts", authMiddleware, async(req,res) => {
    try{
        const contacts = await Contact.find().sort({createdAt: -1});
        res.json(contacts);
    }catch(err){
        res.status(500).json({ message: "Failed to fetch contacts" });
    }
})

const PORT = process.env.PORT||3000;
app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
});



