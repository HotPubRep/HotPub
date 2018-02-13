const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const User = require('../models/User');
const Result = require('../models/Result');
mongoose.connect("mongodb://localhost/HotPub-ironhack");

User.findOne({username:"user1"}).then((usr) => {
  const id = usr._id.toString();
  const results = [
    {
      text: "death",
      emotion: "sadness",
      user_id: id
    },
    {
      text: "sun",
      emotion: "happiness",
      user_id: id
    },
    {
      text: "violence",
      emotion: "sadness",
      user_id: id
    }
  ];
  
  Result.collection.drop();
  
  Result.create(results, (err, docs)=>{
   if (err) { throw err };
     docs.forEach( (result) => {
       console.log(result.text);
     })
     mongoose.connection.close();
  });

})



