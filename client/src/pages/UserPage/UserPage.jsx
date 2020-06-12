import React from 'react';
import './UserPage.css';

export default class UserPage extends React.Component {
    state = {
        searchResults: null
    };

    render() {
        const { axiosHandler, user, shows } = this.props;

        return (
            <div>
                This is the user page
                <button onClick={() => axiosHandler('signOut', user.email_address, user.session)}>Sign Out</button>
            </div>
        )
    }
}