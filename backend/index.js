import express from "express";
import cors from "cors";


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.post("/contact",(req,res) => {
    console.log("form data recieved");
    console.log(req.body);

    res.json({message: "data recieved successfully"});
});

const PORT = 3000;
app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`);
});

