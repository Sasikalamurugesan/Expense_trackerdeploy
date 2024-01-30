const express=require('express')
const app=express()
const bodyParser = require('body-parser');//bodyParser->convert to an understandable form
const{connectToDb,getdb}=require('./db.cjs');//import
const { ObjectId } = require('mongodb');
app.use(express.static(__dirname))
app.use(bodyParser.json())//it change the normal body to json

connectToDb( function(error){
    if(!error){
        //start the server
        const port=process.env.PORT || 3000
        app.listen(port);
        console.log("listen on port 3000")
        db=getdb()
    }
    else{
        //server would not start

        console.log("error")
    }
    //app.listen(3000)//starting the server
})
app.get('/get-data',function(request,response){
    const entries=[]
    db.collection('Cart').find()//if we just give find na it return cursor that cursor point 1st entry then next entry 
    .forEach(entry=> entries.push(entry))
    .then(function(){
        response.status(200).json(entries)
    }).catch(function(error){
        response.status(404).json(
        {
            'error': error
        })
    })
})
app.post('/add-data',function(request,response){
    //const expensedetails=request.body;
   // expenses.push(expensedetails)
    //console.log(request.body)
    db.collection('Cart')
    .insertOne(request.body).then(function(status){
        response.status(200).json({
            'status':'success'
        })
    }).catch(function(error){
       response.status(500).json({
        'status':'error'
      })
    })
})
app.delete('/Eccomercedelete-data',function(request,response){
    if(ObjectId.isValid(request.body.id)){
    db.collection('Cart').deleteOne({
      
        _id: new ObjectId(request.body.id)//objectId-it is used mongodb
    }).then(function(){
        response.status(201).json({
            
              'status':'success'
            

        }) }).catch(function(error){
            response.status(404).json(
            {
                "error": "error"
            })
       })
}
else{
    response.status(201).json({
            
        'status':'ObjectId not found'
    })
}})
app.patch('/Eupdate-data',function(request,response){
    if(ObjectId.isValid(request.body.id)){
        db.collection('Cart').updateOne(
            {_id:new ObjectId(request.body.id)},
            {$set:request.body.data}

        ).then(()=>{
            response.status(200).json({
                'status':'success'
            })
        }).catch(function(error){
            response.status(404).json({
            'status':"error"
        })
        })
    }
    else{
        response.status(201).json({
            
            'status':"ObjectId not found"
        })

    }
})