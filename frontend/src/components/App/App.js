import React from 'react';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Mainpage from '../Mainpage/Mainpage';
import Settings from '../Settings/Settings';
import './App.css';

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
          },
          showSettings: false
      };

      this.loginUser = this.loginUser.bind(this);
      this.logoutUser = this.logoutUser.bind(this);
      this.navigateToHomepage = this.navigateToHomepage.bind(this);
      this.navigateToSettings = this.navigateToSettings.bind(this);
  }

  navigateToSettings() {
      this.setState ({
          showSettings: true
      })
  }

  navigateToHomepage() {
      this.setState ({
          showSettings: false
      })
  }

  //Callback function => allows sending values from Child to Parent
  loginUser(organisation) {
      this.setState ({
          isLoggedIn: true,
          isLoggedOut: false,
          organisation: {
              name: organisation.name,
              token: organisation.token
          },
          showSettings: false
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
          },
          showSettings: false
      });
  }

  render() {
    const { isLoggedIn, isLoggedOut, organisation, showSettings } = this.state;

    /*Setting a prop connected to the callback*/
    var content = <Login userLoggedOut = {isLoggedOut} loginUser = {this.loginUser} />;
    /* Conditional calling depending on isLoggedIn value */
    if(isLoggedIn) {
      /* Conditional calling depending on showSettings value */
      if(showSettings) {
        content = <Settings userToken = {organisation.token}/>;
      }else{
        content = <Mainpage />;
      }
    }

    return (
      <div id="wrapper-parent">
        <div id="wrapper">
            <Navbar logoutUser = {this.logoutUser} userIsLoggedIn = {isLoggedIn} orgName = {organisation.name} 
                    navigateToHomepage = {this.navigateToHomepage}  navigateToSettings = {this.navigateToSettings} />
            {content}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
