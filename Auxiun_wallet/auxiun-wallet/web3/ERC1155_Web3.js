const Web3 = require("web3");
const ganacheNetwork = "http://localhost:8545";
var web3 = new Web3(Web3.currentProvider || ganacheNetwork);

const compiledContract = require("../build/contracts/MultiToken.json");
const contract_address = "0x1819Ece303e29824A28848a7cA093408aBF3a2e3";
const abi = compiledContract.abi;
var contractDetails = new web3.eth.Contract(abi, contract_address);

// SINGLE TOKENS
// @params: address to send created token to, token id, token amount, token data
const createToken = (to, id, amount, data) => {
  try {
    return contractDetails.methods
      .createToken(to, id, amount, data)
      .send({ from: creator, gas: 5000000 });
  } catch (e) {
    return e.message;
  }
};

// @params: owner address, token id
const getTokenBalance = (owner, id) => {
  try {
    return contractDetails.methods.getTokenBalance(owner, id).call();
  } catch (e) {
    return e.message;
  }
};

// @params: address from, address to, token id, token amount, data
const safeTokenTransfer = (from, to, id, amount, data) => {
  try {
    return contractDetails.methods
      .safeTokenTransfer(from, to, id, amount, data)
      .send({ from: from, gas: 5000000 });
  } catch (e) {
    return e.message;
  }
};

// BATCH TOKENS
// @params, to address, ids array, amounts array, data
const createBatchTokens = (to, ids, amounts, data) => {
  try {
    return contractDetails.methods
      .createToken(to, ids, amounts, data)
      .send({ from: creator, gas: 5000000 });
  } catch (e) {
    return e.message;
  }
};

// params@ owner address, ids array
const getBatchBalance = (owner, ids) => {
  try {
    return contractDetails.methods.getBatchBalance(owner, ids).call();
  } catch (e) {
    return e.message;
  }
};

//address from, address to, token ids, token amounts, data
const safeBatchTransfer = (from, to, ids, amounts, data) => {
  try {
    return contractDetails.methods
      .safeTokenTransfer(from, to, ids, amounts, data)
      .send({ from: from, gas: 5000000 });
  } catch (e) {
    return e.message;
  }
};

exports.createToken = createToken;
exports.getTokenBalance = getTokenBalance;
exports.safeTokenTransfer = safeTokenTransfer;
exports.createBatchTokens = createBatchTokens;
exports.getBatchBalance = getBatchBalance;
exports.safeBatchTransfer = safeBatchTransfer;
