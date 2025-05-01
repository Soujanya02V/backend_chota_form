import express from 'express';
import path from "path";


const app = express()

const staticPath = path.join(import.meta.dirname,"public");
app.use(express.static(staticPath));
app.use(express.urlencoded({extended:true}))

app.post("/contact",(req,res)=>{
    console.log(req.body);
    res.redirect("/")

})

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log("in port 3000")
})
