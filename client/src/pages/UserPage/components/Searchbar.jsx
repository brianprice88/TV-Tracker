import React, { useState } from 'react';
import { searchForShow } from '../../../utils/axiosFunctions';
import './Searchbar.css';
import SearchResult from './SearchResult.jsx'

export default function Searchbar({ axiosHandler, user }) {

    const [shows, updateShows] = useState([]);

    async function search(e) {
        e.preventDefault();
        let query = document.getElementById('showSearchBar').value;
        if (query.includes('<')) { return; }
        let searchResults = await searchForShow([user.email_address, user.session, query]);
        updateShows(searchResults)
    }

    return (
        <form
        >
            <div className="form-row align-items-center">
                <div className="col-auto">
                    <h4 className="mb-2">Add a show to your list!  </h4>
                </div>
                <div className="col-auto">
                    <input onChange={search} type="text" id='showSearchBar' placeholder="&#xf002;" className="form-control form-control-underlined border-success mb-2" />
                </div>
            </div>
            {shows.length > 0 ?
                (
                    <div className='form-group'>
                        <table className='table table-striped table-bordered' id='userShowsTable'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Summary</th>
                                    <th><button onClick={function () {
                                        updateShows([]);
                                        document.getElementById('showSearchBar').value = '';
                                    }} className='close'>&times;</button></th>
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
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td><button onClick={function () {
                                        updateShows([]);
                                        document.getElementById('showSearchBar').value = '';
                                    }} className='close'>&times;</button></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                )
                : null}
        </form>
    )
}