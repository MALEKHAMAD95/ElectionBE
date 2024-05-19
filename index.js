const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/Users");

const app = express();


// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection
const password = encodeURIComponent("079078077Qw#"); // Encoding the password
const connectionString = `mongodb+srv://h1995malek:${password}@electiondb.p2vcv5q.mongodb.net/?retryWrites=true&w=majority&appName=electionDB`;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// API endpoint to send user data
app.post("/users", async (req, res) => {
    console.log("req.body: ", req.body);
    try {
        // Extract user data from the request body
        const {
            firstName,
            secondName,
            thirdName,
            lastName,
            profileImage,
            mobileNumber,
            nationality,
            nationalityId,
            workFromDate,
            workToDate,
            email,
            password,
            userName,
        } = req.body;

        // Check if a user with the same email exists
        const existingUser = await User.findOne({ email });

        // If a user with the same email exists, return a message
        if (existingUser) {
            return res
                .status(400)
                .json({ error: "User with the same email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user document
        const newUser = new User({
            firstName,
            secondName,
            thirdName,
            lastName,
            profileImage,
            mobileNumber,
            nationality,
            nationalityId,
            workFromDate,
            workToDate,
            email,
            password: hashedPassword, // Save hashed password
            userName,
        });

        // Save the user to the database
        await newUser.save();

        // Respond with a success message
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// const mongoose = require('mongoose');
// const express = require('express');
// const app = express();
// const users = require('./scr/routers/users');
// const lookups = require('./scr/routers/lookupItem');
// const parentLookupItem = require('./scr/routers/parentLookupItem');
// let PathName = 'api';
// app.use(express.json());
// app.use(`/${PathName}/users`, users);
// app.use(`/${PathName}/lookups`, lookups);
// app.use(`/${PathName}/parentLookups`, parentLookupItem);
// mongoose
//   .connect('mongodb://localhost/ecommerce', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//   })
//   .then(() => console.log('Connected to DB ....'))
//   .catch((error) => console.error(error));
// const port = process.env.port || 3003;
// app.listen(3003, () => console.log('The back end working in  port :', port));

app.get('/api/value', (req, res) => {
    // You can replace 'Hello, world!' with any value you want to return
    res.json({ value: 'Hello, world!' });
    console.log('Hello, world:' );
});



const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


app.use(express.json());

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Retrieve the user with the provided email from the database
        const user = await User.findOne({ email });

        // If user does not exist, return an error response
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare the provided password with the hashed password stored in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        // If passwords do not match, return an error response
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, "your_secret_key");

        // Remove password field from user object
        const { password: _, ...userData } = user.toObject();

        // Return the token and user data as a response
        res.status(200).json({ token, user: userData });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
  

// Start the server
// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}/`);
//   });
  


const http = require('http');

const hostname ='127.0.0.1'; // or 'localhost', or your server's IP address
const port = process.env.PORT || 5000;

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log('port: ', port);
    console.log(`Server running at http://${hostname}:${port}/`);
});

