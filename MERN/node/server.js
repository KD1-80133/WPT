const express = require('express');
const app=express();
const config=require('config');
const PORT=config.get('port');
const appWithDeatilOfProduct=require('./Route/Product');
const cors=require('cors');
app.use(cors());

app.use(express.json());
    


app.use("/Product",appWithDeatilOfProduct);

app.listen(PORT,()=>{console.log(`server started at port ${PORT}`)});

