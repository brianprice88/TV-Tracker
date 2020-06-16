import React from 'react';
import './Episodes.css';
import Episode from './Episode.jsx'

export default function Episodes ({axiosHandler, show, user}) {
    let name = show[0];
    let { tvmaze_id, episodes } = show[1];

    return (
        <div className="modal fade" id={`myModal${tvmaze_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
          
           
            <div className="modal-header">
    <h4 className="modal-title">{name}</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>
            
            
            <div className="modal-body">
            <table className="table table-condensed">
    <thead>
      <tr>
        <th>Season</th>
        <th>Number</th>
        <th>Watched</th>
        <th>Episode Details</th>
      </tr>
    </thead>
    <tbody>
    {
    Object.entries(episodes).map((episode, index) => 
    <Episode 
    axiosHandler={axiosHandler}
    user={user}
    key={index}
    episode={episode}
    tvmaze_id={tvmaze_id}
    /> 
    )
    }
    </tbody>
    </table>
            </div>      
          
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
            </div>
            
          </div>
        </div>
      </div>
    )
}