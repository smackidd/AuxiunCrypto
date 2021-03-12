const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

const usersRouter = require('./routes/users');
const transactionsRouter = require('./routes/transactions');
const marketplaceRouter = require('./routes/marketplace');
const devapiRouter = require('./routes/devapi');



app.use('/api/user', usersRouter);
app.use('/api/transaction/buy', transactionsRouter);
app.use('/api/marketplace/', marketplaceRouter);
app.use('/api/dev/asset', devapiRouter);


  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});