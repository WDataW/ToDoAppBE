require('module-alias/register')
require('dotenv').config();
const express = require('express');
const app = express();
const connect = require('./db/connect');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middleware');
const { authRouter } = require('./routes');

// middleware
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRouter);
app.use(notFound);
app.use(errorHandler);


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