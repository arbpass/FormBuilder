require('dotenv').config();
const express= require('express');
const app= express();
require('./models/conn');
const cors= require('cors');
const user= require("./routes/user");
const dashboard= require("./routes/dashboard");
const port= process.env.port || 4000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(user);
app.use(dashboard);

app.listen(port, ()=> {
    console.log('server started');
})