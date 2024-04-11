const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
app.use(express.json()); // type of post in my DB is json

mongoose.connect(process.env.MONGODB_URI)
    .then( //promise
        () => {console.log("Connection to mongodb established")},
        err => {console.log("Failed to connect to mongodb", err )}
    );

    const user = require('./routes/user.route');
    const userProduct = require('./routes/user.products.routes');

    app.use('/api/users', user) //user as middleware
    app.use('/api/user-products', userProduct)


    app.listen(port, () => {
        console.log("Server is up")
    })