import React from 'react';
import './UserPage.css';
import TopBar from './components/TopBar.jsx'
import Searchbar from './components/Searchbar';
import ShowListing from './components/ShowListing'

export default function UserPage({ axiosHandler, user, shows }) {
    let userShows = Object.entries(shows)

    return (
        <div className='container-fluid'>
            <div className='row'>
            <TopBar
                axiosHandler={axiosHandler}
                user={user}
            />
            </div>

            <div className='row'>
            <Searchbar
                axiosHandler={axiosHandler}
                user={user}
            />
            </div>

            <div className='col-auto userShowsContainer'>
            <h1>Your shows:</h1>
            {
                userShows.length > 0 ?
                    <table className='table table-hover table-striped table-bordered' id='addedShowsTable'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>
                                    Notification
                           <i className="fa fa-question-circle showsTableHeading" >
                                        <span className="showsTableMessage">Choose whether you want to be notified on the day a show airs</span>
                                    </i>
                                </th>
                                <th>
                                    Progress
                            <i className="fa fa-question-circle showsTableHeading" >
                                        <span className="showsTableMessage">Keep track of which of a show's episodes you've watched</span>
                                    </i>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userShows.map((show, index) =>
                                <ShowListing
                                    show={show}
                                    key={index}
                                    axiosHandler={axiosHandler}
                                    user={user} />
                            )}
                        </tbody>
                    </table>
                    :
                    <>
           
                    <h1>You haven't added any shows yet!</h1>
                    </>
            }
            </div>
        </div>
    )
}