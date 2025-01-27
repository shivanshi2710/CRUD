const express = require('express');
const {  MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
const app = express();
const dbName = "secondCRUD";
app.use(express.json());

app.get('/get-all-users', async (req, res) => {
  await client.connect();
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  const collection = db.collection("index");
  const data = await collection.find({}).toArray();
  res.send(data);
})

app.get('/get-userby-age', async (req, res) => {
   await client.connect();
   console.log("Connected successfully to server");
   const db = client.db(dbName);
   const collection = db.collection("index");
   const queryAge = parseInt(req.query.age);
   const data = await collection.find({age:queryAge},{age:{ $lte: 18}}).toArray();
   res.send(data);


})


app.post("/create-user", async (req, res) => {
  await client.connect();
  console.log("connected successfully");
  const db = client.db(dbName);
  const collection = db.collection("index");
  const body = req.body;
  // console.log(body);
  const data = await collection.insertOne(body);
  res.send(data);
});

app.post("/create-users", async (req, res) => {
  await client.connect();
  console.log("connected successfully");
  const db = client.db(dbName);
  const collection = db.collection("index");
  const body = req.body;
  // console.log(body);
  const data = await collection.insertMany(body);
  res.send(data);
});

app.put("/update-user", async (req, res) => {
  await client.connect();
  console.log("successfully connected");
  const db = client.db(dbName);
  const collection = db.collection("index");
  const queryname = req.query.name;
  const body = req.body;
  const data = await collection.updateOne({name:queryname} ,{$set:body})
  res.send(data);
});

app.delete("/delete-user", async (req, res) => {
  await client.connect();
  console.log("Successfully connected");
  const db = client.db(dbName);
  const collection = db.collection("index");
  const queryname = req.query.name;
  const body = req.body;
  // const data = await collection.deleteOne({ name: queryname });
  const data = await collection.deleteOne(body);
  res.send(data);
});
app.delete("/delete-user", async (req, res) => {
  await client.connect();
  console.log("Successfully connected");
  const db = client.db(dbName);
  const collection = db.collection("index");
  const queryname = req.query.name;
  const body = req.body;
  // const data = await collection.deleteOne({ name: queryname });
  const data = await collection.deleteMany(body);
  res.send(data);
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})