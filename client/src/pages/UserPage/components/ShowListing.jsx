import React from 'react';
import './ShowListing.css'
import Episodes from './Episodes'

export default function ShowList({ show, axiosHandler, user }) {
    let name = show[0];
    let { tvmaze_id, notification, episodes } = show[1];
    let { email_address, session } = user;

    function removeShow() {
        axiosHandler('removeShow', email_address, session, tvmaze_id)
    }

    function toggleShowNotification(e) {
        axiosHandler('toggleNotification', email_address, session, tvmaze_id);
    }

    return (
        <tr>
            <td>
                {name}
                <button onClick={removeShow} type="button" className="btn btn-warning">Remove from list</button>
            </td>

            <td>
                <div className="flipswitch">
                    <input onClick={(e) => toggleShowNotification(e)} type="checkbox" name="flipswitch" className="flipswitch-cb" id={`${tvmaze_id}-toggle`}  defaultChecked={notification ? 'checked' : ''}/>
                    <label className="flipswitch-label" htmlFor={`${tvmaze_id}-toggle`}>
                        <div className="flipswitch-inner"></div>
                        <div className="flipswitch-switch"></div>
                    </label>
                </div>
            </td>

            <td>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#myModal">
                    View your progress
                </button>
                <Episodes 
                axiosHandler={axiosHandler}
                show={show}
                user={user}
                />
            </td>

        </tr>
    )
}