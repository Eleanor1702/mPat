import React from 'react';
import Department from './Department';
import './Settings.css';
import axios from 'axios';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departments: []
        };

        this.getDepartments = this.getDepartments.bind(this);
    }

    getDepartments() {
			//To get all Department, a token verification is necessary. While this is a 'get' request
			//axios allow headers to pass data from Frontend to backend
				axios.get(
					'http://localhost:5000/departments', {
						headers: {
							token: this.props.userToken
						}
					}
				).then((departments) => {
					this.setState ({
							departments: departments.data
					})
        }).catch((reason) => {
            console.log(reason);
        });
    }

    //LifeCycle method: is generated from react.component and is called when component is initially shown
    //Perfectly suitable for loading data, that will be displayed in page
    componentDidMount() {
        this.getDepartments();
    }

    render () {
        const { departments } = this.state;

        return (
            <div>
                <section className="hero is-half-medium is-light is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <h1 className="title title-style">
                                Departments
                            </h1>
                        </div>
                    </div>
                </section>
                <section className="section">
                    <div className="container">
                        <div className="buttons has-addons is-right">
                            <button className="button is-success">
                                <span className="icon is-small is-left">
                                    <i className="fas fa-plus"></i>
                                </span>
                                <span>New Department</span>
                            </button>
                        </div>
                        <table className="table is-bordered is-striped is-hoverable is-fullwidth">
                            <thead>
                                <tr>
                                    <th><abbr title="Identification Number">ID</abbr></th>
                                    <th>Name</th>
                                    <th>WIP Threshold</th>
                                    <th>Created At</th>
                                    <th>Updated At</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* 'key' is important to identify each element und allow React to track changes of element 
                                    after each update */}
                                {departments.map((department) => <Department key={department.id} department = {department}/>)}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        )
    }
}

export default Settings;