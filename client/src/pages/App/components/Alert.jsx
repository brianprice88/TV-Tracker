import React from 'react';
import './Alert.css'

export default function Alert({ clearAlert, alert }) {
    return (

        <div className='popup'>
            <h4>ALERT!</h4>
            <div className='popup\_inner'>
                <p>{alert}</p>
                <button className="btn btn-light" onClick={clearAlert}>Dismiss</button>
            </div>
        </div>
    )
}