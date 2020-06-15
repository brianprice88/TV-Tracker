import React from 'react';
import './UserPage.css';
import TopBar from './components/TopBar.jsx'
import Searchbar from './components/Searchbar';
import ShowListing from './components/ShowListing'

export default function UserPage({ axiosHandler, user, shows }) {
    let userShows = Object.entries(shows)
    return (
        <div className='container-fluid'>
            <TopBar
                axiosHandler={axiosHandler}
                user={user}
            />
            <Searchbar
                axiosHandler={axiosHandler}
                user={user}
            />
            <table className='table'>

                <thead className="thead-dark">
                    <tr>
                        <th>
                            <div className='sortHeading'>
                                Name
                        <div className='sortIcons'>
                                    <i className="fa fa-sort-asc" ></i>
                                    <i className="fa fa-sort-desc" ></i>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div className='sortHeading'>
                                Notification
                        <div className='sortIcons'>
                                    <i className="fa fa-sort-asc" ></i>
                                    <i className="fa fa-sort-desc" ></i>
                                </div>
                            </div>
                        </th>
                        <th>
                            <div className='sortHeading'>
                                Episodes
                        <div className='sortIcons'>
                                    <i className="fa fa-sort-asc" ></i>
                                    <i className="fa fa-sort-desc" ></i>
                                </div>
                            </div>
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


        </div>
    )
}