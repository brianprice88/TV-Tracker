import React from 'react';
import './UserPage.css';

export default class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          shows: null
        };
    }

    render() {
        return (
            <div>
                This is the user page
            </div>
        )
    }
}