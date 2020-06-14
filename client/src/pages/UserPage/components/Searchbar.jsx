import React, { useState } from 'react';
import { searchForShow } from '../../../utils/axiosFunctions';
import './Searchbar.css';
import SearchResult from './SearchResult.jsx'

export default function Searchbar({ axiosHandler, user }) {

    const [shows, updateShows] = useState([]);

    async function search() {
        let query = document.getElementById('showSearchBar').value;
        document.getElementById('showSearchBar').value = '';
        if (!query.match(/^[0-9a-zA-Z]+$/)) { return; }
        let searchResults = await searchForShow([user.email_address, user.session, query]);
        updateShows(searchResults)
    }

    return (
        <div>
            <div className="form-group mb-4">
                <label>Add a show to your list!  </label>
                <input type="text" id='showSearchBar' placeholder="Enter show name" className="form-control form-control-underlined border-success" />
                <button className="btn btn-primary" onClick={search}>Search</button>
                {shows.length > 0 ?
                    (
                        <table className='table table-striped table-bordered'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Summary</th>
                                    <th><button onClick={() => updateShows([])} className='close'>&times;</button></th>
                                </tr>
                            </thead>
                            <tbody>
                                {shows.map(show =>
                                    <SearchResult
                                        axiosHandler={axiosHandler}
                                        user={user}
                                        name={show.name}
                                        key={show.tvmazeId}
                                        id={show.tvmazeId}
                                        summary={show.summary}
                                        updateShows={updateShows}
                                    />
                                )}
                            </tbody>
                        </table>
                    )
                    : null}
            </div>
        </div>
    )
}