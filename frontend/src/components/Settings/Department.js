import React from 'react';

/* Represents Department object components, to be displayed in Settings */

class Department extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        //Extracting properties from nested object
        //obj = this.props, nested obj = department, properties = {id, name, wip, createTime, updateTime}
        //!Caution: properties name should match requested-data labelling from backend, otherwise JSON won't recognize the
        //properties and wont list the data correctly, resulting in an empty table.
        const { 
            department: { 
                id, name, wipThreshold, createdAt, updatedAt
            } 
        } = this.props;

        return (
            <tr>
                <th>{id}</th>
                <td>{name}</td>
                <td>{wipThreshold}</td>
                <td>{createdAt}</td>
                <td>{updatedAt}</td>
                <td>
                    <button className="button is-fullwidth is-small">Edit</button>
                </td>
            </tr>
        );
    }
}

export default Department;