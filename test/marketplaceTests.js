const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../backend/server"); //This reqiures the 'module.exports = app.listen(3000) line at the bottom of the server.js file.

//Assertion Style
chai.should();

//Use chai-htttp for server requests
chai.use(chaiHttp);


/////////////////////////////////////////////
//Mocha Tests for marketplace.js API routes//
/////////////////////////////////////////////
describe('Marketplace API Tests', () => {


    ///////////////////////////////////////////////////
    //Tests for '/asset/list/:assetId' POST API Route//
    ///////////////////////////////////////////////////
    describe('/asset/list/:assetId POST (List asset on marketplace)', () => {

    })


    /////////////////////////////////////
    //Tests for '/asset' GET API Route//
    ///////////////////////////////////
    describe('/assets GET (Get All Assets on Marketplace)', () => {

    })


    ///////////////////////////////////
    //Tests for '/add' POST API Route//
    ///////////////////////////////////
    describe('/add POST (Adds asset to asset database)', () => {

    })
})