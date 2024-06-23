const express = require('express');
const nodemon = require('nodemon');
const mongoose = require('mongoose');
const MONGODB = "mongodb+srv://bisignanosam:Tree123.@dogsappcluster.dfjdchh.mongodb.net/"

const app = express();

mongoose.connect(`${MONGODB}`, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.get('/', (req, res) => {
    res.send('Hello World!');
    });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
    });

