import React from 'react'

export default function ShowList ({show, key}) {
    let name = show[0];
    let {tvmaze_id, notification, episodes} = show[1]
    console.log(notification)

    return (
        <tr>
        <td>{key}</td>
    <td>{name}</td>
    <td>{notification.toString()}</td>
    <td>Episodes</td>
        </tr>
    )
}