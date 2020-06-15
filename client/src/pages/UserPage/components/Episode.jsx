import React from 'react';
import './Episodes.css';

export default function Episode ({axiosHandler, user, tvmaze_id, episode}) {
    const {email_address, session} = user;
console.log(episode)
    function getInfo () {
        axiosHandler('getEpisodeInfo', email_address, session, tvmaze_id) // + season and number
        }
    
        function toggleWatchedStatus () {
            console.log(!episode[1])
        axiosHandler('updateEpisodeList', email_address, session, tvmaze_id, episode[0], !episode[1]) // last param is to change from unwatched to watched or vice versa
        }

    return (
         <tr>
        <td>{episode[0].split('.')[0]}</td>
        <td>{episode[0].split('.')[1]}</td>
        <td>
        <input onClick = {toggleWatchedStatus} type='checkbox' defaultChecked={episode[1] ? 'checked' : ''}></input>
        </td>
        <td>

        </td>
    </tr>
    )
}