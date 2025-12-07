const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/modelSchema')
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use(express.json());

app.get('/products', async (req, res) => {
    try {
      const products = await UserModel.find({});
      res.json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

app.get("/products/:id",async(req,res)=>{

    const {id} = req.params;
    try{
    const products = await UserModel.findById(id);
     res.status(200).json(products);
    }
    catch(err){
        console.log(err);
    }

})

app.post('/products', async (req, res) => {
    try {
      const products = await UserModel.create(req.body);
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

app.put("/update/:id",async(req,res)=>{

    const { id } = req.params;
    const { upd } = req.body;
    
    try {
      const products = await UserModel.findByIdAndUpdate(id, req.body);
      
      if (!products) {
        console.log("Not updated the " + id);
        res.status(404).json({ error: "Product not found" });
      } else {
        const updproduct = await UserModel.findById(id);
        res.status(200).json(updproduct);
        
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
    
    
})


app.listen(PORT, ()=>{
    console.log(`listening on ${PORT}`);
})