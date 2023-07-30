const mongoose = require('mongoose')
const dotenv = require('dotenv').config()


/**const db_connection= async function (){
    const URL= process.env.DB_CONNECTION
    const client = new MongoClient(URL).connect().then((db)=>{
        console.log(db)
      }).catch((e)=>{console.log(e)})
}**/


//MongoDB Connection
const db_connection = async function(){
    await mongoose.connect(process.env.DB_CONNECTION).then((db)=>{
        console.log('connection established')   
})

}
module.exports = db_connection
