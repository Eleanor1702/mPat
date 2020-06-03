import React from 'react';
import './Mainpage.css';

class Mainpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = null;
    };

    render() {
        return (
            <div class="container is-fluid margin-top">
                <div class="notification">
                    Body
                </div>
            </div>
        );
    }
}

export default Mainpage;