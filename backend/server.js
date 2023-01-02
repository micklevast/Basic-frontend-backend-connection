const express = require("express");
const app = express();
const cors = require("cors");

// Connect to MongoDB
const mongoose = require("mongoose");

// Define the Task and User models
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const Task = mongoose.model("Task", taskSchema);
const User = mongoose.model("User", userSchema);

// Connect to the database
try {
  // Connect to the database
  mongoose.connect(
    "mongodb+srv://chauhan:book9820@cluster0.wdvykrp.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  );

  console.log("Successfully connected to the database");
} catch (error) {
  console.log("Error connecting to the database:", error);
}

// Define the documents to insert
const tasks = [
  { title: "Task 1", description: "Description 1", completed: false },
  { title: "Task 2", description: "Description 2", completed: false },
  { title: "Task 3", description: "Description 3", completed: false },
];

const users = [
  { name: "User 1", email: "user1@example.com", password: "password1" },
  { name: "User 2", email: "user2@example.com", password: "password2" },
  { name: "User 3", email: "user3@example.com", password: "password3" },
];

// Enable CORS for all routes
app.use(cors());

app.get("/", (req, res) => {
  console.log(res);
  console.log(req);
  res.send("thank u godJI");
});

app.get("/user", (req, res) => {
  User.create(users, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
    res.send("thank u dear users");
  });
});
app.get("/task", (req, res) => {
  // Insert the documents
  Task.create(tasks, (error, result) => {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
    }
    res.send("thank task forces,god  will protect all the world");
  });
});

const MongoClient = require("mongodb").MongoClient;

// Replace YOUR_MONGODB_CONNECTION_URL with your actual MongoDB connection URL
const url =
  "mongodb+srv://chauhan:book9820@cluster0.wdvykrp.mongodb.net/test?retryWrites=true&w=majority";

app.get("/api/user", (req, res) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "Error connecting to the database" });
        return;
      }

      const db = client.db("test"); // replace 'test' with your database name
      db.collection("users")
        .find({})
        .toArray((err, documents) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .send({ error: "Error retrieving documents from the database" });
            return;
          }
          console.log("getted data:------------", documents);
          console.log("getted data from datase..........");
          res.send(documents);
          client.close();
        });
    }
  );
});
app.get("/api/task", (req, res) => {
  MongoClient.connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err, client) => {
      if (err) {
        console.error(err);
        res.status(500).send({ error: "Error connecting to the database" });
        return;
      }

      const db = client.db("test"); // replace 'test' with your database name
      db.collection("tasks")
        .find({})
        .toArray((err, documents) => {
          if (err) {
            console.error(err);
            res
              .status(500)
              .send({ error: "Error retrieving documents from the database" });
            return;
          }
          console.log("getted data:------------", documents);
          console.log("getted data from datase..........");
          res.send(documents);
          client.close();
        });
    }
  );
});
app.get("/test", (req, res) => {
  res.send("this is data of backend of test api!");
});

app.listen(5000, () => {
  console.log(`listeing on http://localhost:${5000}/`);
});
