import React from 'react';
import './SearchResult.css';

export default function SearchResult ({axiosHandler, user, name, id, summary}) {

    function addShowToList() {
    axiosHandler('addShowToList', user.email_address, user.session, id, name)
    }

    return (
        <div>
           
            {name}
            {summary}
            <button onClick = {addShowToList}></button>
        </div>
    )

}