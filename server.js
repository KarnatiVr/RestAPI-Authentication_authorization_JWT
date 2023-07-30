const express= require('express')
const { MongoClient }= require('mongodb')
const mongoose= require('mongoose')
const db_conn  = require('./Database/mongoConnection')


// Import Routing
const router= require('./routers/routes.js')
const app = express()

app.use(express.json())




//Middleware Router
app.use('/', router)


const PORT =  40000;
// Listening on port 8000
app.listen(PORT,  (err)=>{
  if(!err){
    console.log(`i am listening on port ${PORT}`)
    // connecting to DB
     db_conn()

  }
  else{
    console.log(err)
  } 
})