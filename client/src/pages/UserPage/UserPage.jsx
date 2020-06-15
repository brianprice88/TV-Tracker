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
            <table className='table table-hover table-striped'>

                <thead>
                    <tr>
                        <th>
                            Name
                        </th>
                        <th>
                           Notification  
                           <i className="fa fa-question-circle showsTableHeading" >
                           <span className="showsTableMessage">Choose whether you want to be notified on the day a show airs</span> 
                           </i>
                        </th>
                        <th>
                            Episodes
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


        </div>
    )
}