import React from 'react';

export default function SearchResult({ axiosHandler, user, name, id, summary, updateShows }) {

    function addShowToList() {
        axiosHandler('addShowToList', user.email_address, user.session, id, name)
        updateShows([]);
        document.getElementById('showSearchBar').value = '';
    }

    return (
        <tr>
            <td>{name}</td>
            <td><div dangerouslySetInnerHTML={{
                __html: summary
            }}></div></td>
            <td><button className='btn btn-success' onClick={addShowToList}>Add Show!</button></td>
        </tr>
    )

}