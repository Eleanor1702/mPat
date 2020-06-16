import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {
    constructor(props) { 
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event) {
        this.props.logoutUser();
    }

    render() {
        return (
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="http://localhost:3000">
                        <img src="img/waiting-room.png" alt="mPat: Patient waiting time system" width="32"/>
                        <label className="navbar-brand-label">mPat Backoffice</label>
                    </a>
                </div>
                <div className={`${this.props.userIsLoggedIn ? "" : "is-hidden"} navbar-end`}>
                    <div className="navbar-item has-dropdown is-hoverable">
                        <div className="navbar-link is-arrowless is-circle is-transparent has-default-cursor">
                            <button className="button is-info is-outlined is-circle">
                                <i className="fas fa-user-nurse fa-2x"></i>
                            </button>
                        </div>
                        <div className="navbar-dropdown is-right">
                            <a id="userName" className="navbar-item is-transparent has-default-cursor">{this.props.orgName}</a>
                            <hr className="navbar-divider"/>
                            <a className="navbar-item">Settings</a>
                            <a className="navbar-item" onClick={this.handleLogout}>Log Out</a>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;