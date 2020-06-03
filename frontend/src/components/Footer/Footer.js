import React from 'react';

class Footer extends React.Component {
    constructor(props) { super(props) }

    render() {
        return (
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

                    {/* <p>
                        <strong>Bulma</strong> by <a href="https://jgthms.com">Jeremy Thomas</a>. The source code is licensed
                        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
                        is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
                    </p> */}
                </div>
            </footer>
        );
    }
}

export default Footer;