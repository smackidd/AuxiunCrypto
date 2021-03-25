const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../backend/server"); //This reqiures the 'module.exports = app.listen(3000) line at the bottom of the server.js file.

//Assertion Style
chai.should();

//Use chai-htttp for server requests
chai.use(chaiHttp);


////////////////////////////////////////
//Mocha Tests for devapi.js API routes//
////////////////////////////////////////
describe('DevAPI Tests', () => {

    ////////////////////////////////////
    //Tests for '/new' POST API Route//
    ///////////////////////////////////
    describe('/new POST (Post new asset to database and marketplace)', () => {

    })


    //////////////////////////////////////
    //Tests for '/verify' GET API Route//
    /////////////////////////////////////
    describe('/verify GET (Find assets for specific user.)', () => {
        
    })
})