//imports
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const multer = require('multer');
const path = require('path');

const User = require('./models/userModel.js')
const ImageModel = require('./models/imageModel.js')


const app = express();

//middleware
app.use(express.json());
app.use(cors()); // Add this line to enable CORS

app.use(express.static('public'))

// Set up multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({
    storage: storage
});


//post files
app.post('/upload', upload.single('file'), (req, res) => {
    ImageModel.create({ image: req.file.filename })
        .then(result => res.json(result))
        .catch(err => console.log(err))
})
//get files
app.get('/getImage', (req, res) => {
    ImageModel.find()
        .then(images => res.json(images))
        .catch(err => res.json(err))
        
})


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


