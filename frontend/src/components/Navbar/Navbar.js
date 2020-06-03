import React from 'react';
import './Navbar.css';

class Navbar extends React.Component {
    constructor(props) { super(props) }

    render() {

        return (
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item" href="https://bulma.io">
                        <img src="img/waiting-room.png" alt="mPat: Patient waiting time system" width="32"/>
                        <label className="navbar-brand-label">mPat Backoffice</label>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    </a>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <button class={`button is-info is-outlined is-circle
                                            ${this.props.userIsLoggedIn ? "" : "is-hidden"}`}>
                                <i class="fas fa-user-nurse fa-2x"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;