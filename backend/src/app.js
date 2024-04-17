const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const route = require('./routes/routes');

require("./db/connect")
const app = express();

app.use(cors({
    credentials: true,
    origin: ['https://manasmedimart.netlify.app']
}));
app.use(cookieParser());
app.use(express.json());

app.use("/auth",route);

app.get('/api/message', (req, res) => { 
    res.json({ message:  'API route connected' }); 
});

app.listen(3000, ()=>{
    console.log(`Server started at port number 3000`);
})