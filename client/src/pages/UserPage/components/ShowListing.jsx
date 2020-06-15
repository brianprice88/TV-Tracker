import React from 'react';
import './ShowListing.css'
import { toggleNotification } from '../../../utils/axiosFunctions';

export default function ShowList({ show, axiosHandler, user }) {
    let name = show[0];
    let { tvmaze_id, notification, episodes } = show[1];
    let {email_address, session} = user;

    function removeShow() {
        axiosHandler('removeShow', email_address, session, tvmaze_id) 
    }

    function toggleShowNotification() {
    axiosHandler('toggleNotification', email_address, session, tvmaze_id)   
    }

    return (
        <tr>
            <td>
                {name}
                <button onClick = {removeShow} type="button" className="btn btn-warning">Remove from list</button>
            </td>

            <td>

                <div className="flipswitch">
                    <input onClick={toggleShowNotification} type="checkbox" name="flipswitch" className="flipswitch-cb" id={`${tvmaze_id}`} value={notification ? 'on' : 'off'} />
                    <label className="flipswitch-label" htmlFor={`${tvmaze_id}`}>
                        <div className="flipswitch-inner"></div>
                        <div className="flipswitch-switch"></div>
                    </label>
                </div>
            </td>

            <td>Episodes</td>
        </tr>
    )
}