import Axios from 'axios';

const host = "localhost:5000";

export const getUserInfo = (data) => {
  //Axios.get(`http://${host}/api/user/login/${data.username}`)
  //.then((res) => { return res; })
  alert("successful call to api");
  const res = {
    success: true, 
    authKey: "token"
  }
  return res;
}

export const saveUserInfo = (data) => {
  //Axios.post(`http://${host}/api/user/new`, data).then((res) => { return res; })
  alert("successful call to api");
  const res = {
    success: true,
    authKey: "token"
  }

  return res;
}