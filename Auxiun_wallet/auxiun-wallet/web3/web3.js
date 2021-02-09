import Web3 from "web3";

if (typeof web3 !== 'undefined')
{
    web3 = new Web3(web3.currentProvider);
}
else
{
    // Testing purposes with Ganache
    web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
}

