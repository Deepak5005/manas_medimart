const mongoose = require('mongoose');
const Item = require('../models/item');

mongoose.connect("mongodb+srv://atulrajtiwari098:S1hUMvFDaRPOg9FP@cluster0.nobfwwq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",{
}).then(()=>{
    console.log("Connection to DB successful");
    Item.find({})
        .then(items => {
            console.log("Items found:", items);
        })
        .catch(err => {
            console.error("Error fetching items:", err);
        })
}).catch((e)=>{
    console.log(e)
    console.log("Connection to DB unsuccessful");
})