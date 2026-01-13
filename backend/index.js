import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv"
import Contact from "./models/Contact.js"

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

const PORT = process.env.PORT||3000;
app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
});

