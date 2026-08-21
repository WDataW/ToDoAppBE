require('dotenv').config();
const express = require('express');
const app = express();
const connect = require('./db/connect');
const port = 3000 || process.env.PORT;
const start = async () => {
    try {
        await connect(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server listening on port ${port}`));
    } catch (error) {
        console.log(error.message);
    }
}
start();