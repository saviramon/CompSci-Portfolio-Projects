import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const GameEdit = ({ gameToEdit }) => {
    const [title, setTitle]         = useState(gameToEdit.title);
    const [releaseYear, setYear]    = useState(gameToEdit.releaseYear);
    const [trophyName, setTrophy]   = useState(gameToEdit.trophyName);
    const [acquireDate, setAcquire] = useState(gameToEdit.acquireDate);

    const redirect = useNavigate();

    const editGame = async () => {
        const response = await fetch(`/games/${gameToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                title: title, 
                releaseYear: releaseYear, 
                trophyName: trophyName,
                acquireDate: acquireDate
            }),
            headers: {'Content-Type': 'application/json',},
        });

        if (response.status === 200) {
            alert('Game was successfully updated');
            redirect("/gamesPages");
        } else {
            const errMessage = await response.json();
            alert(`Game did not update ${response.status}. ${errMessage.Error}`);
        }
    };

    return (
        <>
            <article>
            <h2>Edit a Game Achievement</h2>
                <p>Fill out the form below to edit the game achievements.</p>
                <table>
                    <caption>Edit this Game:</caption>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Release Year</th>
                            <th>Trophy Name</th>
                            <th>Acquire Date</th>
                            <th>Save Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><label htmlFor="title">Game Title</label>
                                <input 
                                    type="text" 
                                    id="title" 
                                    placeholder="Title of the game" 
                                    value={title} 
                                    onChange={e => setTitle(e.target.value)} 
                                />
                            </td>
                            <td>
                                <label htmlFor="releaseYear">Release Year</label>
                                <input 
                                    type="number" 
                                    id="releaseYear" 
                                    value={releaseYear} 
                                    onChange={e => setYear(e.target.value)} 
                                />
                            </td>
                            <td>
                                <label htmlFor="trophyName">Trophy Name</label>
                                <input 
                                    type="text" 
                                    id="trophyName" 
                                    value={trophyName} 
                                    onChange={e => setTrophy(e.target.value)} 
                                />
                            </td>
                            <td>
                                <label htmlFor="acquireDate">Acquire Date</label>
                                <input 
                                    type="date" 
                                    id="acquireDate" 
                                    value={acquireDate} 
                                    onChange={e => setAcquire(e.target.value)} 
                                />
                            </td>
                            <td>
                            <label htmlFor="submit">Commit</label>
                                <button 
                                    type="submit" 
                                    id="submit" 
                                    onClick={editGame}
                                >Edit</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </article>
        </>
    );
};

export default GameEdit;