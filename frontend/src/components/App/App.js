import React from 'react';
import Login from '../Login/Login';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import Mainpage from '../Mainpage/Mainpage';

class App extends React.Component {
  constructor(props) { 
      super(props);
      this.state = {
          isLoggedIn: false
      }

      this.setLoggedIn = this.setLoggedIn.bind(this);
  }

  //Callback function => allows sending values from Child to Parent
  setLoggedIn(status) {
      this.setState ({
          isLoggedIn: status
      });
  }

  render() {
    const { isLoggedIn } = this.state;

    /*Setting a prop connected to the callback*/
    var content = <Login setLoggedIn = {this.setLoggedIn} />;
    /*Conditional calling depending on isLoggedIn value*/
    if(isLoggedIn) {
        content = <Mainpage />;
    }

    return (
      <div>
        <Navbar userIsLoggedIn = {this.state.isLoggedIn} />
        {content}
        <Footer />
      </div>
    );
  }
}

export default App;
