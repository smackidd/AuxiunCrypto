const { getDefaultNormalizer } = require('@testing-library/react');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/walletDB", {useNewUrlParser:true});

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    firstname: String,
    lastname: String,
    accountnumber: Number,
    coinbalance: Number,
    avatar: Image
});

const User = mongoose.model("User", userSchema);

const user = new User ({
    email: "epson123456@gmail.com",
    password: 123456,
    firstname: "epson",
    lastname: "ronquillo",
    accountnumber: 11111,
    coinbalance: 999999,
    avatar: Image
})

user.save();

const devsSchema = new mongoose.Schema({
    email: String,
    password: String,
    companyname: String,
    authkey: String
});

const assetstokenSchema = new mongoose.Schema({
    token: String,
    owner: String,
    inmarketplace: String,
    price: String
});

const marketplaceSchema = new mongoose.Schema({
    tokenid: String,
    price: String,
    listdate: Date
});