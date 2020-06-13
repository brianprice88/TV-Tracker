import React, { useState } from 'react';
import {searchForShow} from '../../../utils/axiosFunctions';
import './Searchbar.css';

export default function Searchbar({ axiosHandler, user }) {

    let searchResults;

    // const [searchResults, updateSearchResults] = useState('foo');

    async function search() {
    // updateSearchResults([])
    let query = document.getElementById('showSearchBar').value;
    document.getElementById('showSearchBar').value = '';
    if (!query.match(/^[0-9a-zA-Z]+$/)) {return;}
    searchResults = await searchForShow([user.email_address, user.session, query]);
    // let searchRes = await searchForShow([user.email_address, user.session, query]);
    // let updatedState = searchResults.concat(searchRes)
    // updateSearchResults('bar')
    }

    return (
        <div>
            <div className="form-group mb-4">
                <label>Add a show to your list!  </label>
                <input type="text" id='showSearchBar' placeholder="Enter show name" className="form-control form-control-underlined border-success" />
                <button className="btn btn-primary" onClick={() => search()}>Search</button>
            </div>
        </div>
    )
}