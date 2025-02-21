const express = require('express');
const mongoose=require('mongoose');
const cors=require('cors')

require('dotenv').config()

const PORT=process.env.PORT;
const URL=process.env.MONGODB_URI.replace('<db_password>',process.env.MONGODB_PASSWORD);
const tripRoutes = require("./routes/trip");
const app = express();
app.use(express.json());
app.use(cors());


//routes
app.use('/api/auth',require('./routes/auth'));
app.use("/api/trips", tripRoutes);

app.use((err,req,res,next)=>{
    res.status(err.status || 500).json({
        message:err.message
    })
})


// connect moongose
mongoose.connect(URL).then(()=>{
    console.log('connected to db')
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    })
}).catch(err=>{
    console.log(err);
})





