import React from "react";
import "./Navbar.css";
import PropTypes from "prop-types";

class Navbar extends React.Component {

	render() {
		return (
			<nav className="navbar is-light" role="navigation" aria-label="main navigation">
				<div className="navbar-brand has-pointer-cursor">
					{/* ignores specific failures by eslint */}
					{/* eslint-disable-next-line */}
					<a className="navbar-item" onClick={this.props.navigateToHomepage}>
						<img src="img/waiting-room.png" alt="mPat: Patient waiting time system" width="32"/>
						<label className="navbar-brand-label has-pointer-cursor">mPat Backoffice</label>
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
							{/* eslint-disable-next-line */}
							<a id="userName" className="navbar-item is-transparent has-default-cursor">{this.props.orgName}</a>
							<hr className="navbar-divider"/>
							{/* eslint-disable-next-line */}
							<a className="navbar-item" onClick={this.props.navigateToSettings}>Settings</a>
							{/* eslint-disable-next-line */}
							<a className="navbar-item" onClick={this.props.logoutUser}>Log Out</a>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

Navbar.propTypes = {
	navigateToHomepage: PropTypes.func.isRequired,
	userIsLoggedIn: PropTypes.bool.isRequired,
	orgName: PropTypes.string.isRequired,
	navigateToSettings: PropTypes.func.isRequired,
	logoutUser: PropTypes.func.isRequired
};

export default Navbar;