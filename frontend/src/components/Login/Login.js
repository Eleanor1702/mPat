import React from 'react';
import './Login.css';
import axios from 'axios';
import Mainpage from '../Mainpage/Mainpage';

class Login extends React.Component {
    constructor(props) { 
        super(props);
        this.state = {
            regNrHasErrors: false,
            registrationNr: "",
            passHasErrors: false,
            password: "",
            processRequested: false
        };
        
        //This binding is necessary to make 'this' work in the callback
        this.handleRegNrChange = this.handleRegNrChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.requestLogin = this.requestLogin.bind(this);
        this.isRegNrValid = this.isRegNrValid.bind(this);
        this.isPassValid = this.isPassValid.bind(this);
    }

    requestLogin() {
        const { registrationNr, password } = this.state;
        
        if(!this.isRegNrValid()) {
            this.setState({
                processRequested: false
            });
        }else if (!this.isPassValid()) {
            this.setState({
                processRequested: false
            })
        }else{
            axios.post('http://localhost:5000/authentication', {
                registrationNr: registrationNr,
                passKey: password
            }).then(() => {
                console.log("LogIN");
                //Manipulate a value in Parent through the callback function
                //Set 'isLoggedIn' to true, when a user has successfully logged in
                this.props.setLoggedIn(true);
            }).catch(() => {
                console.log("Error!!!!!")
                this.setState({
                    processRequested: false,
                    regNrHasErrors: true,
                    passHasErrors: true
                })
            });
        }
    }

    handleLoginClick(event) {
        const { value } = event.target;
        
        this.setState ({
            processRequested: true
        }, 
        () => this.requestLogin());
    }

    isRegNrValid() {
        const { registrationNr } = this.state;
        if(registrationNr == null || registrationNr == "") {
            this.setState ({
                regNrHasErrors: true
            });
            return false;
        }else{
            this.setState ({
                regNrHasErrors: false
            });
            return true;
        }
    }

    isPassValid() {
        const { password } = this.state;
        if(password == null || password == "") {
            this.setState ({
                passHasErrors: true
            });
            return false;
        }else{
            this.setState ({
                passHasErrors: false
            });
            return true;
        }
    }

    validateInput(identifier) {
        if(identifier == "regNr") {
            this.isRegNrValid();
        }else{
            this.isPassValid();
        }
    }

    handleRegNrChange(event) {
        //New Syntax to extract the value of event.target
        const { value } = event.target;
        this.setState ({
            registrationNr: value
        }, 
        //This is the callback function, which evaluate the new result of state
        () => this.validateInput("regNr"));
    }

    handlePassChange(event) {
        //New Syntax to extract the value of event.target
        const { value } = event.target;
        this.setState ({
            password: value
        }, 
        //This is the callback function, which evaluate the new result of state
        () => this.validateInput("pass"));
    }

    render() {
        const { regNrHasErrors, passHasErrors, processRequested } = this.state;

        return (
            <div className="columns is-centered col">
                <div className="column is-two-fifths">
                    <div className="panel is-info is-centered">
                        <p className="panel-heading">
                            Login
                        </p>
                        <div className="panel-block has-no-border-bottom">
                            <p className="control has-icons-left has-icons-right">
                                <input className={`input ${regNrHasErrors ? "is-danger" : ""}`} type="text" placeholder="Registration Number" onChange={this.handleRegNrChange} />
                                <span className="icon is-small is-left">
                                    <i className="far fa-user"></i>
                                </span>
                            </p>
                        </div>
                        <div className="panel-block has-no-border-bottom">
                            <p className="control has-icons-left">
                                <input className={`input ${passHasErrors ? "is-danger" : ""}`} type="password" placeholder="Password" onChange={this.handlePassChange} />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-lock"></i>
                                </span>
                            </p>
                        </div>
                        <div className="panel-block is-centered">
                            <button className={`button is-info is-halfWidth ${processRequested ? "is-loading" : ""}`} onClick={this.handleLoginClick}>
                                Login
                            </button>
                        </div>
                        
                    </div>
                </div>
            </div> 
        );
    }
}

export default Login;