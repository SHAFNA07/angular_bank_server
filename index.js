// //import express and store in a variable
const express= require("express")


// //import  ds

const ds=require('./service/dataservice')

//import jswt

const jwt=require ("jsonwebtoken")

// //app creation

const app=express()

// //to convert all datas from json to js

 app.use(express.json())

 //middleware creation

 const jwtMiddleware=(req,res,next)=>
 {

 try{
        // access data from request body
        const token=req.headers['access-token']
    
        //verify the token with secret key
        const data=jwt.verify(token,"superkey123")
    
        console.log(data);
    
        next()
     }
 
 catch
 {
     res.status(422).json(
     {
        status:false,
        message:"please login",
        statusCode:404
      })

  }

}

// //register post

app.post("/register",(req,res)=>{
     
    const result= ds.register(req.body.acno,req.body.uname,req.body.psw)
    
    res.status(result.statusCode).json(result)
 })

// //login get


app.post("/login",(req,res)=>{
     
    const result= ds.login(req.body.acno,req.body.psw)
    
    res.status(result.statusCode).json(result)
 })


// //deposit patch

app.post("/deposit",jwtMiddleware,(req,res)=>{
     
    const result= ds.deposit(req.body.acno,req.body.psw,req.body.amnt)
    
    res.status(result.statusCode).json(result)
 })


// //withdraw patch

app.post("/withdraw",jwtMiddleware,(req,res)=>{
     
    const result= ds.withdraw(req.body.acno,req.body.psw,req.body.amnt)
    
    res.status(result.statusCode).json(result)
 })

// //transaction get

app.get("/transaction",jwtMiddleware,(req,res)=>{
     
    const result= ds.getTransaction(req.body.acno)
    
    res.status(result.statusCode).json(result)
 })

// //delete delete

// //resolve api

//  app.get("/",(req,res)=>{
//     res.send('Get Method Working......')
//  })

// app.post("/",(req,res)=>{
//     res.send('post Method Working....')
// })


// app.put("/",(req,res)=>{
//     res.send('put Method Working....')
// })

// // app.patch("/",(req,res)=>{
// //     res.send('patch Method Working....')
// // })

// // app.delete("/",(req,res)=>{
// //     res.send('delete Method Working....')
// // })


// // //port set 

 app.listen(3000,()=>{console.log("server started at port 3000");})

