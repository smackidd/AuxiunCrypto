const Web3 = require("web3");
const ganacheNetwork = "http://localhost:8545";
var web3 = new Web3(Web3.currentProvider || ganacheNetwork);
const compiledContract = require("../build/contracts/Coin.json");
const contract_address = "0x979B2c4e63a66ec79688b398Ef5aA7e20c582266"; //Change This!!!
const abi = compiledContract.abi;
var contractDetails = new web3.eth.Contract(abi, contract_address);

//Used to grab account zero from the blockchain.
const getAccountZero = async () => {
  accounts = await web3.eth.getAccounts();
  return accounts[0];
};

//Used to get the balance of a specific account.
const getBalance = (address) => {
  try {
    return contractDetails.methods.getBalance(address).call();
  } catch (e) {
    return e.message;
  }
};

//Can be called to mint coins to a specific account.
//Example: If a user purchases Auxiun coin you would call this to add coins to their wallet.
const mint = async (receiver, amount) => {
  try {
    var sender = await getAccountZero(); //Sender will be account zero on the blockchain (Technically the creator).
    contractDetails.methods
      .mint(receiver, amount) //Calling the mint method from the smart contract.
      .send({ from: sender }); //Sending from account zero.
    return `Successfully minted ${amount} coins to ${receiver}`;
  } catch (e) {
    return e.message;
  }
};

//Used to transfer coins from one account to another. Sender/Receiver CANNOT be account zero.
//Example: If a user purchases a item from another user we can call this function to transfer the payment.
const transfer = (sender, receiver, amount) => {
  try {
    contractDetails.methods
      .transferTokens(sender, receiver, amount)
      .send({ from: sender });
    return `${amount} coins transferred from ${sender} to ${receiver}`;
  } catch (e) {
    return e.message;
  }
};

exports.getBalance = getBalance;
exports.mint = mint;
exports.transfer = transfer;
