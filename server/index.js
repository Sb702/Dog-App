const express = require('express');
const nodemon = require('nodemon');
const mongoose = require('mongoose');
const MONGODB = "mongodb+srv://bisignanosam:Tree123.@dogsappcluster.dfjdchh.mongodb.net/DogsDB"
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(`${MONGODB}`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));



// app.get('/', userRoutes);
app.post('/register', userRoutes);
app.post('/login', userRoutes);

app.post('/addDog', userRoutes);
app.post('/getDogs', userRoutes);
app.post('/updateDog', userRoutes);

app.post('/addTrick', userRoutes);
app.post('/removeTrick', userRoutes);

app.listen(5000, () => {
    console.log('Server is running on port 5000');
    });

