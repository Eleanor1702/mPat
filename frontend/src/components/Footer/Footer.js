import React from 'react';
import './Footer.css';

class Footer extends React.Component {

    render() {
        return (
            <div>
                <footer className="footer">
                    <div className="content has-text-centered">
                        <p>
                            Icon made by 
                            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
                                <strong> Freepik </strong>
                            </a> 
                            from 
                            <a href="https://www.flaticon.com/" title="Flaticon">
                                <strong> Flaticon</strong>
                            </a>

                            <br></br>

                            <strong>mPat</strong> by 
                            <a href="https://github.com/Eleanor1702" title="Noor Alrabea">
                                <strong> Noor Alrabea</strong>
                            </a>
                        </p>
                    </div>
                </footer>
                <ul id="footer-menu">
                    <li className="footer-menu-item">mPat</li>
                    <li className="footer-menu-item">Terms</li>
                    <li className="footer-menu-item">Privacy</li>
                    <li className="footer-menu-item">What is mPat?</li>
                </ul>
            </div>
        );
    }
}

export default Footer;