import React, { useState } from 'react';
import './Episode.css';
import { getEpisodeInfo } from '../../../utils/axiosFunctions';

export default function Episode({ axiosHandler, user, tvmaze_id, episode }) {
    const { email_address, session } = user;
    let season = episode[0].split('.')[0];
    let number = episode[0].split('.')[1];

    const defaultState = { name: 'N/A', summary: 'N/A', airdate: 'N/A' }
    const [ep, addEpisodeDetails] = useState(defaultState)


    async function getInfo() {
        let infoRequest = await getEpisodeInfo([email_address, session, tvmaze_id, season, number])
        addEpisodeDetails(infoRequest);
    }

    function toggleWatchedStatus() {
        axiosHandler('updateEpisodeList', email_address, session, tvmaze_id, episode[0], !episode[1]) // last param is to change from unwatched to watched or vice versa
    }

    return (
        <tr className='episodesTableRow'>
            <td>{season}</td>
            <td>{number}</td>
            <td>
                <input onClick={toggleWatchedStatus} type='checkbox' defaultChecked={episode[1] ? 'checked' : ''}></input>
            </td>
            <td>
                <button onClick={getInfo} type="button" className="btn btn-info">More Info</button>
                {
                    ep.name !== 'N/A' ?
                        <div className='col-auto moreEpisodeInfo'>
                            <button onClick={() => addEpisodeDetails(defaultState)} type="button" className="btn btn-primary btn-sm">Close</button>
                            <h1>{ep.name} <br/><span>(Original Airdate: {ep.airdate.slice(5, 10) + '-' + ep.airdate.slice(0, 4)})</span></h1>
                            <div dangerouslySetInnerHTML={{
                                __html: ep.summary
                            }}></div>
                            <button onClick={() => addEpisodeDetails(defaultState)} type="button" className="btn btn-primary btn-sm">Close</button>
                            </div>
                        : null
                }
            </td>
        </tr>
    )
}