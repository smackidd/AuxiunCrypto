const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server"); //This reqiures the 'module.exports = app.listen(3000) line at the bottom of the server.js file.

//Assertion Style
chai.should();

//Use chai-htttp for server requests
chai.use(chaiHttp);


///////////////////////////////////////
//Mocha Tests for users.js API routes//
///////////////////////////////////////
describe('Users API', () => {

    ///////////////////////////////
    //Tests for '/' GET API route//
    ///////////////////////////////
    describe('/ GET (get all users)', () =>{

        //Test to see if /:id works as expected
        it('Test: Correct Response from Server', (done) => {
            chai.request(server)
                .get('/api/user/')
                .end((err, res) => {
                   res.body.should.not.be.null;
                })
            done();
        })
    })
 

    //////////////////////////////////
    //Tests for '/:id' GET API route//
    //////////////////////////////////
    describe('/:id GET (get user info for specific user)', () =>{

        //DO NOT CHANGE STRING
        const nonDevUserID = '6054cd7083b917262083c9cf';

        //Test to see if /:id works as expected
        it('Test: Get NonDev Account by ID', (done) =>{
            chai.request(server)
                .get('/api/user/'+nonDevUserID)
                .end((err, res) => {
                    res.body.should.not.be.null;
                })
            done();
        })

        //DO NOT CHANGE STRING
        const devUserID = '6054cd7183b917262083c9d0';

        //Test to see if Get Dev Account By ID is working
        it('Test: Get Dev Account by ID', (done) =>{
            chai.request(server)
                .get('/api/user/'+devUserID)
                .end((err, res) => {
                    res.body.should.not.be.null;
                })
            done();
        })

        //DO NOT CHANGE STRING
        const wrongID = '1234';

        //Test for error response when incorrect id is passed
        it('Test: Error Response for Incorrect/Missing ID', (done) =>{
            chai.request(server)
                .get('/api/user/'+wrongID)
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(400);
                })
            done();
        })
    })


    /////////////////////////////////////
    //Tests for '/:id' DELETE API route//
    /////////////////////////////////////
    describe('/:id DELETE (delete specific user)', () =>{

        //Update this string with the userID of account created in previous testing run username should be 'Tests-NonDev1'
        const nonDevUserDeleteID ='6054c475e61e2729cc08320d';

        it('Test: Succesful NonDev Deletion', (done) => {
            chai.request(server)
                .delete('/api/user/'+nonDevUserDeleteID)
                .end((err, res) => {
                    //console.log(res.text)
                    res.text.should.not.be.null;
                })
            done();
        })

        //Update this string with the userID of account created in previous testing run username should be 'Tests-Dev1'
        const devUserDeleteID ='6054c475e61e2729cc08320e';

        it('Test: Succesful Dev Deletion', (done) => {
            chai.request(server)
                .delete('/api/user/'+devUserDeleteID)
                .end((err, res) => {
                    //console.log(res.text)
                    res.text.should.not.be.null;
                })
            done();
        })

        //DO NOT CHANGE STRING
        const wrongUserID = '1234'

        it('Test: Incorrect UserId Error Handling', (done) => {
            chai.request(server)
                .delete('/api/user/'+wrongUserID)
                .end((err, res) => {
                    //console.log(res.text)
                    res.should.have.status(400);
                })
            done();
        })
    })


    ///////////////////////////////////
    //Tests for '/new' POST API route//
    ///////////////////////////////////
    describe('/new POST (register new user)', () =>{
        
        //Increment Username and Password Everytime you run a new test
        const userNonDev = {
            username: 'Tests-NonDev1',
            password: 'Tests-NonDev1',
            firstname: 'Kaelan-NonDev-Test',
            lastname: 'Kaelan-NonDevTest',
            dev: false
        }
    
        //Test for succesful non dev account registration
        it('Test for NonDev user Registration', (done) =>{
            chai.request(server)
            .post('/api/user/new')
            .send(userNonDev)
            .end((err, res) => {
                console.log(res.text);
            })
            done();
        })

        //Increment Username and Password Everytime you run a new test
        const userDev = {
            username: "Tests-Dev1",
            password: "Tests-Dev1",
            firstname: "Kaelan-Dev-Test",
            lastname: "Kaelan-Dev-Test",
            dev: true,
            companyname: "DevTest"
        }

        //Test for succesful dev account registration
        it('Test for Dev user Registration', (done) =>{
            chai.request(server)
                .post('/api/user/new')
                .send(userDev)
                .end((err ,res) => {
                    console.log(res.text);
                })
            done();
        })
    })


    /////////////////////////////////////
    //Tests for '/login' POST API route//
    /////////////////////////////////////
    describe('/login POST (login user)', () =>{
        
        //DO NOT CHANGE STRINGS
        const nonDevLoginCreds = {
            username:'Tests-NonDev-DoNotDelete',
            password: 'Tests-NonDev-DoNotDelete'
        }
        
        //Test for Succesful NonDev Login
        it('Test: Succesful NonDev Login', (done) => {
            chai.request(server)
                .post('/api/user/login')
                .send(nonDevLoginCreds)
                .end((err, res) => {
                    //console.log(res.text);
                    res.should.not.be.null;
                })
            done();
        })

        //DO NOT CHANGE STRINGS
        const devLoginCreds = {
            username: 'Tests-Dev-DoNotDelete',
            password: 'Tests-Dev-DoNotDelete'
        }

        //Test For Succesful Dev Login
        it('Test: Succesful Dev Login', (done) => {
            chai.request(server)
                .post('/api/user/login')
                .send(devLoginCreds)
                .end((err, res) => {
                    //console.log(res.text);
                    res.should.not.be.null;
                })
            done();
        })

        //DO NOT CHANGE STRINGS
        const wrongLoginCreds = {
            username:'wrongloginhandle',
            password: 'wrongloginpassword'
        }

        //Test for Login Attempt Error Handling, Passes Incorrect Credentials
        it('Test: Login Atttempt Error Handling', (done) => {
            chai.request(server)
                .post('/api/user/login')
                .send(wrongLoginCreds)
                .end((err, res) => {
                    //console.log(res.text);
                    res.should.have.status(400);
                })
            done();
        })
    })


    ////////////////////////////////
    //Tests for /:id PUT API route//
    ////////////////////////////////
    describe('/:id PUT (update specific user info)', () =>{

        const userID = '6054b2418dd7654134b4a560';
        const userInfo = {
            username: 'Tests-UserUpdate-DoNotDelete',
            password: 'Tests-UserUpdate-DoNotDelete',
            firstname: 'Kaelan',
            lastname: 'Croucher',
            dev: true,
            companyname: 'UpdateWorked'
        };

        //Test for NonDev Account Update
        it('Test: NonDev UserInfo Update', (done) => {
            chai.request(server)
                .post('/api/user/'+userID)
                .send(userInfo)
                .end((err, res) => {
                    res.should.not.be.null;
                })
            done();
        })
        
        const devUserID = '6054b3a18dd7654134b4a561';
        const devUserInfo = {
            username: 'Tests-DevUserUpdate-DoNotDelete',
            password: 'Tests-DevUserUpdate-DoNotDelete',
            firstname: 'Kaelan',
            lastname: 'Croucher',
            dev: false
        }

        //Test for Dev Account Update
        it('Test: Dev UserInfo Update', (done) => {
            chai.request(server)
                .post('/api/user/'+devUserID)
                .send(devUserInfo)
                .end((err, res) => {
                    res.should.not.be.null;
                })
            done();
        })

        const incorrectUserId = '1234';

        //Test for inccorect userId error Handling
        it('Test: Incorrect/Missing UserID', (done) => {
            chai.request(server)
                .post('/api/user/'+incorrectUserId)
                .send(devUserInfo)
                .end((err, res) => {
                    res.should.have.status(404);
                })
            done();
        })

        const correctUserID = '6054b2418dd7654134b4a560';
        const incorrectUserInfo = {
            username: 'Tests-UserUpdate-DoNotDelete',
            password: '1234',
            firstname: 'UpdateTest',
            lastname: 'UpdatetTest'
        };

        //Test for Correct UserID but incorrect Credentials Error Handling.
        it('Test: Correct UserID incorrect Credentials', (done) => {
            chai.request(server)
                .post('/api/user/'+correctUserID)
                .send(incorrectUserInfo)
                .end((err, res) => {
                    res.should.have.status(404);
                })
            done();
        })
    })
})