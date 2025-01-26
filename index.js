

const express = require('express');
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const app = express();

const dbname ='CRUD';

app.get('/get-all-users' ,async(req, res) => {
    // res.send('Hello, World!');
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db("CRUD");
    const collection = db.collection('user');
     const data = await collection.find({}).toArray();
    //  console.log(data);
    res.send(data);
})




app.get('/get-userby-name' ,async(req, res) => {
    // res.send('Hello, World!');
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db("CRUD");
    const collection = db.collection('user');
    const queryname = req.query.name;
    console.log(req.query);
     const data = await collection.find({name:queryname}).toArray();
    //  console.log(data);
    res.send(data);
})
app.get('/get-userby-age',async(req, res) => {
   await client.connect();
    console.log('Connected successfully to server');
    const db = client.db("CRUD");
    const collection = db.collection('user');
    const queryage = parseInt(req.query.age);
    // console.log(req.query);
    const data = await collection.find({age:queryage}).toArray();
   res.status(200).send(data);

});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});
