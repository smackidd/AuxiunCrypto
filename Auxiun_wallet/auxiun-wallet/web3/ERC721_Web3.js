const Web3 = require("web3"); //Requiring web3.
const ganacheNetwork = "http://localhost:8545"; //This is our connection for ganache (Allows for easy testing)
var web3 = new Web3(Web3.currentProvider || ganacheNetwork); //Setting the connection either to the currentProvider or Ganache.
const compiledContract = require("../build/contracts/GameAssests.json"); //Grabbing the json version of our contract. ** Assets is misspelt in name of json file.
const contract_address = "0x170B39A7D070Da55FAA349195Bf9C776193A3Fd0"; //This will be address of the contract on the blockchain. Specific to your local block chain change for testing.
const abi = compiledContract.abi; //Gets the abi of our compiled contract.

var contractDetails = new web3.eth.Contract(abi, contract_address); //Allows to access the contracts details (Methods, events, constants, etc.)

//Function sends information to createItem method in GameAssets contract. Accepts a uri and the specific blockchain address of creator.
//Returns the token id that smart contract assigned the token. 
const createItem = async (uri, creator) => {
  try {
    return contractDetails.methods
      .createItem(uri)
      .send({ from: creator, gas: 5000000 })
      .then((receipt) => {
        let tokenId = receipt.events.Minted.returnValues.tokenId;
        return tokenId;
      });
  } catch (e) {
    return e.message;
  }
};

// Function sends information to transferItem method in GameAssets contract. Accepts two specific block chain addresses, one for receiver and one for the sender and the tokenId for the specific item being transfered.
const transferItem = (from, to, tokenId) => {
  try {
    contractDetails.methods
      .transferItem(from, to, tokenId)
      .send({ from: from, gas: 5000000 });
    return "Item transfered to successfully";
  } catch (e) {
    return e.message;
  }
};

//Function sends information to ownerOfToken method in GameAssets contract. Accepts a tokenId for the specific item being searched and returns with the blockchain address of owner.
const ownerOfToken = (tokenId) => {
  try {
    return contractDetails.methods.ownerOfToken(tokenId).call();
  } catch (e) {
    return e.message;
  }
};


//Return the specific tokenURI based on the token id.
const getTokenURI = (tokenId) => {
  try {
    return contractDetails.methods.getTokenURI(tokenId).call();
  } catch (e) {
    return e.message;
  }
};


//Exports
exports.ownerOfToken = ownerOfToken;
exports.createItem = createItem;
exports.transferItem = transferItem;
exports.getTokenURI = getTokenURI;
