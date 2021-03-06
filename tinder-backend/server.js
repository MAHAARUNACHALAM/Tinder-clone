import express from 'express'
import mongoose from 'mongoose'
import Cards from './dbCards.js'
import Cors from 'cors';

//App Config
const app=express();
const port = process.env.PORT || 8001
const connection_url = "mongodb+srv://admin:VzfSX7aCUHn6zkVe@cluster0.suy5a.mongodb.net/tinderdb?retryWrites=true&w=majority"

//Middlewares
app.use(express.json());
app.use(Cors());
//DB config
mongoose.connect(connection_url,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true,
})

//API Endpoints
app.get("/",( req ,res)=> res.status(200).send("Hello Clever"));

app.post('/tinder/cards',(req,res)=>{
    console.log("db post body" ,res,req)
    const dbCard =req.body;

    Cards.create(dbCard,(err,data)=>{
        if(err){
            res.status(500).send(err)
        } else{
            res.status(201).send(data)
        }
        
    });
});

app.get('/tinder/cards',(req,res)=>{
    console.log("db request body" ,res,req)
    const dbCard =req.body;

    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        } else{
            res.status(200).send(data)
        }
        
    });
});

//Listener
app.listen(port,()=>console.log(`listening on localhost: ${port}`))