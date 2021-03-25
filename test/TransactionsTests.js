const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../backend/server"); //This reqiures the 'module.exports = app.listen(3000) line at the bottom of the server.js file.

//Assertion Style
chai.should();

//Use chai-htttp for server requests
chai.use(chaiHttp);


///////////////////////////////////////////////
//Mocha Tests for transactions.js API routes//
/////////////////////////////////////////////
describe('Transactions API Tests', () => {


    //////////////////////////////////////
    //Tests for '/coin/' POST API Route//
    ////////////////////////////////////
    describe('/coin/ POST (Add Coins to User Account)', () => {

    })

    //////////////////////////////////////
    //Tests for '/asset' POST API Route//
    ////////////////////////////////////
    describe('/asset POST (Buy Asset With Auxiun Coin)', () => {

    })
    
})
