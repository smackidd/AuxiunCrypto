import Axios from 'axios';
//import { response } from 'express';

const host = "localhost:5000";


const getUserInfo = async (data) => {
  return await Axios.post(`http://${host}/api/user/login`, data)
  .then((res) => { return res; })
  .catch((err) => { 
    const response = { 
      data: {
        success: false,
        message: err.response.data
      }
    };
    return response; })
}

const saveUserInfo = async (data) => {
  return await Axios.post(`http://${host}/api/user/new`, data)
  .then((res) => {
    console.log("response new", res);
    return res;
  })
  .catch((err) => { 
    const response = { 
      data: {
        success: false,
        message: err.response.data
      }
    };
    return response; })
}

// receives data: { coinAmount, authKey }
const buyTokens = async (data) => {
  //console.log("data", data);
  return await Axios.post(`http://${host}/api/transaction/buy/coin`, data, 
    { headers: { "auth-token": data.authKey }})
    .then((res) => { return res })
    .catch((err) => { 
      const response = { 
        data: {
          success: false,
          message: err.response.data
        }
      };
      return response; })  
}

export {getUserInfo, saveUserInfo, buyTokens};