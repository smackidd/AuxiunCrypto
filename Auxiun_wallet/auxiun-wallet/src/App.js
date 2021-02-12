import React from 'react';
import './App.css';
import NavBar from './components/navbar/navbar';
import Content from './components/Content/content';

function App() {
  const [loggedIn, setLoginStatus] = React.useState(false);

  return (
    <div className="App">
      <NavBar loggedIn={loggedIn}></NavBar>
      <br />
      <Content loggedIn={loggedIn}/>  
    </div>
  );
}

export default App;
