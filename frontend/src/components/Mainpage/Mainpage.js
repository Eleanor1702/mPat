import React from "react";
import "./Mainpage.css";

class Mainpage extends React.Component {
	constructor(props) {
		super(props);
		this.state = null;
	}

	render() {
		return (
			<div className="container is-fluid top-marg-1rem bot-marg-1rem">
				<div className="notification">
                    Body
				</div>
			</div>
		);
	}
}

export default Mainpage;