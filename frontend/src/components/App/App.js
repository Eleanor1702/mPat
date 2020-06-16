import React from 'react';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Mainpage from '../Mainpage/Mainpage';

class App extends React.Component {
  constructor(props) { 
      super(props);
      this.state = {
          //Signed to 'false' -> No user is available
          //Signed to 'true' -> User is available
          isLoggedIn: false,
          isLoggedOut: false,
          organisation: {
              name: "",
              token: ""
          }
      }

      this.loginUser = this.loginUser.bind(this);
      this.logoutUser = this.logoutUser.bind(this);
  }

  //Callback function => allows sending values from Child to Parent
  loginUser(organisation) {
      this.setState ({
          isLoggedIn: true,
          isLoggedOut: false,
          organisation: {
              name: organisation.name,
              token: organisation.token
          }
      });
  }

  //Callback func {App.js - Navbar.js}
  logoutUser() {
      this.setState ({
          isLoggedIn: false,
          isLoggedOut: true,
          organisation: {
              name: "",
              token: ""
          }
      });
  }

  render() {
    const { isLoggedIn, isLoggedOut, organisation } = this.state;

    /*Setting a prop connected to the callback*/
    var content = <Login userLoggedOut = {isLoggedOut} loginUser = {this.loginUser} />;
    /*Conditional calling depending on isLoggedIn value*/
    if(isLoggedIn) {
        content = <Mainpage />;
    }

    return (
      <div>
        <Navbar logoutUser = {this.logoutUser} userIsLoggedIn = {isLoggedIn} orgName = {organisation.name} />
        {content}
        <Footer />
      </div>
    );
  }
}

export default App;
