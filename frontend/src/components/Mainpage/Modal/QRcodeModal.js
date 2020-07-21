import React from "react";
import PropTypes from "prop-types";
import NewWindow from "react-new-window";
import QRCodeWindow from "../QRCodeWindow";

class QRcodeModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			QRCodeRequested: false
		};

		this.requestQRcode = this.requestQRcode.bind(this);
		this.renderQRcodeWindow = this.renderQRcodeWindow.bind(this);
		this.QRCodeWindowCloseRequest = this.QRCodeWindowCloseRequest.bind(this);
	}

	requestQRcode() {
		this.setState({
			QRCodeRequested: true
		});
	}

	QRCodeWindowCloseRequest() {
		this.setState ({
			QRCodeRequested: false
		});
	}

	renderQRcodeWindow() {
		const windowFeatures = {
			resizable: "yes",
			width: "1400",
			height: "800"
		};

		return (
			<NewWindow 
				features = {windowFeatures}
				onUnload = {this.QRCodeWindowCloseRequest}
			>
				<QRCodeWindow patId = {this.props.patId} />
			</NewWindow>
		);
	}

	render() {
		let QRcodeWindow = null;
		const { showModal, patId, closeModalRequest } = this.props;
		const { QRCodeRequested } = this.state;

		if(QRCodeRequested) {
			QRcodeWindow = this.renderQRcodeWindow();
		}

		return (
			<div className={`modal ${showModal ? "is-active" : ""}`}>
				<div className="modal-background"></div>
				<div className="modal-content">
					{/* Any other elements you want */}
					<header className="modal-card-head has-background-success">
						<p className="modal-card-title has-icons-left">
							<span className="icon is-small is-left mr-3 has-text-white">
								<i className="far fa-check-circle"></i>
							</span>
							<strong className="has-text-white">
								Patient has been successfully added!
							</strong>
						</p>
					</header>
					<section className="modal-card-body">
						<div className="field">
							<article className="message is-info">
								<div className="message-body">
									In case the patient has the <strong>mPat</strong> app,
									the following <strong>QR code</strong> or <strong>id</strong> can be entered,
									so the user can see details about his stay in 
									the waiting room.
								</div>
							</article>
						</div>

						<div className="field mt-5">
							<h1 className="title has-text-centered">
								ID no: {patId}
							</h1>
						</div>

						<div className="field has-text-centered mt-5">
							<button 
								className="button is-info is-medium"
								onClick={this.requestQRcode}
							>
								<span className="icon is-small is-left">
									<i className="fas fa-qrcode"></i>
								</span>
								<span>Show QR Code</span>
							</button>

							{/* QR Window Component */}
							{QRcodeWindow}
						</div>

						<div className="field has-text-centered mt-5">
							<button 
								className="button is-medium"
								onClick={closeModalRequest}>
								Close
							</button>
						</div>
					</section>
				</div>
			</div>
		);
	}
}

QRcodeModal.propTypes = {
	showModal: PropTypes.bool.isRequired,
	patId: PropTypes.string.isRequired,
	closeModalRequest: PropTypes.func.isRequired
};

export default QRcodeModal;