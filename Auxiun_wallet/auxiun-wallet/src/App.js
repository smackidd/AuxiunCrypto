import React from 'react';
import './App.css';
import NavBar from './components/navbar/navbar';
import Content from './components/Content/content';

function App() {
  const [loggedIn, setLoginStatus] = React.useState(false);
  const [user, setUser] = React.useState([]);
  const [home, setHome] = React.useState(true);

  const handleNewUser = (userInfo) => {
    setUser([{userInfo}])
    setLoginStatus(true);
  }

  //toggles between Home and Marketplace
  const handleSetHome = () => {
    setHome(true);
  }

  const handleSetMarketplace = () => {
    setHome(false);
  }

  return (
    <div className="App">
      <NavBar 
        user={user} 
        loggedIn={loggedIn} 
        handleSetHome={() => handleSetHome()}
        handleSetMarketplace={() => handleSetMarketplace()}></NavBar>
      <br />
      <Content 
        handleNewUser={(userInfo) => handleNewUser(userInfo)} 
        user={user} 
        loggedIn={loggedIn}
        home={home}
        handleSetHome={() => handleSetHome}/>  
    </div>
  );
}

export default App;
