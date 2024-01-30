const {MongoClient} = require('mongodb')
let db
function connectToDb(startServer){

    MongoClient.connect('mongodb+srv://sasikalam21it:Gd4CeQAoYntoLIBi@cluster0.2tw6imi.mongodb.net/ExpenseTracker')
    .then(//to handle promise
        function(client){
   db=client.db();// to access the db 
   return startServer()
        }).catch(function(error){
            return startServer(error)
        })
        console.log(db)
    

    
}
function getdb(){
    return db
}

module.exports ={connectToDb,getdb}