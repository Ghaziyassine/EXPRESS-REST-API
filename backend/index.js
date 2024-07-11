//imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const User = require('./models/userModel.js')
const app = express();

//middleware
app.use(express.json());
app.use(cors()); // Add this line to enable CORS



//get all users
app.get('/api/users', async (req, res) => {
    try {
        const user = await User.find(req.body);
        res.status(200).json(user);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//get user by id
app.get('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const u = await User.findById(id);
        res.status(200).json(u);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//add user
app.post('/api/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//update user
app.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await User.findByIdAndUpdate(id, req.body);

        if (!User) {
            return res.status(404).json({ message: "user not found" })
        }

        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

//Delete user
app.delete('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndDelete(id, req.body);

        if (!User) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: "User deleted successfully" });
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});


//conection to mongodb 
mongoose.connect("mongodb://127.0.0.1:27017")
    .then(() => {
        console.log("you are connected to database")
        app.listen(3000, () => {
            console.log("server is running  port 3000");
        });
    }).catch(() => {
        console.log("Connection failed")
    });


