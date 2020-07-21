import React from "react";
import PropTypes from "prop-types";
import QRCode from "qrcode.react";

class QRCodeWindow extends React.Component {
	constructor(props) {
		super(props);
		this.state = null;
	}

	render() {
		const { patId } = this.props;
		
		return (
			<div className="container mt-6">
				<h1 className="title has-text-centered mt-5">
					Please scan the following QR Code to receive information regarding
					your waiting time during your stay at the hospital...
				</h1>
				<div className="card">
					<div className="card-content">
						<div className="content columns">
							<div className="column is-one-quarter"></div>
							<div className="column is-half">
								<QRCode size={512} value={patId} />
							</div>
							<div className="column is-one-quarter"></div>
						</div>
					</div>
				</div>
			</div>
		);
	} 
}

QRCodeWindow.propTypes = {
	patId: PropTypes.string.isRequired
};

export default QRCodeWindow;