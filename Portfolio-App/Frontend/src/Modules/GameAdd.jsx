import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

export const GameAdd = () => {
    const [title, setTitle] = useState('');
    const [releaseYear, setYear] = useState('');
    const [trophyName, setTrophy] = useState('');
    const [acquireDate, setAcquire] = useState('');

    const redirect = useNavigate();
    

const addGame = async (event) => {
    event.preventDefault();
    const slicedAcquireDate = acquireDate.slice(0, 10);
    const newGame = { title, releaseYear, trophyName, acquireDate:slicedAcquireDate };

    try {
        const response = await fetch('/games', {
            method: 'post',
            body: JSON.stringify(newGame),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 201) {
            alert('Game added successfully!');
            redirect("/gamesPages");
        } else {
            alert(`Failed to add game. Status code= ${response.status}`);
        }
    } catch (error) {
        alert(`An error occurred while adding the game.= ${response.status}`);
    }
};

  return (
    <>
        <h2>Add a Game</h2>
        <section>
        <article>
            <p>Fill out the fields below to add a new game.</p>
            <form onSubmit={addGame}>
                <table>
                    <caption>What game are you adding to this collection?</caption>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Release Year</th>
                            <th>Trophy Name</th>
                            <th>Acquired Date</th>
                            <th>Submit</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="title"></label>
                                <input 
                                    type="text" 
                                    id="title"
                                    placeholder="Title of the game" 
                                    value={title} 
                                    onChange={e => setTitle(e.target.value)}
                                    required  
                                />
                            </td>
                            <td>
                                <label htmlFor="releaseYear"></label>
                                <input 
                                    type="number" 
                                    id="releaseYear" 
                                    placeholder="Year of release"
                                    value={releaseYear} 
                                    onChange={e => setYear(e.target.value)}
                                    required 
                                />
                            </td>
                            <td>
                                <label htmlFor="trophyName"></label>
                                <input 
                                    type="text" 
                                    id="trophyName"
                                    placeholder="Name of the trophy"
                                    value={trophyName} 
                                    onChange={e => setTrophy(e.target.value)}
                                    required 
                                />
                            </td>
                            <td>
                                <label htmlFor="acquireDate"></label>
                                <input 
                                    type="date" 
                                    id="acquireDate"
                                    value={acquireDate} 
                                    onChange={e => setAcquire(e.target.value)}
                                    required
                                />
                            </td>
                            <td>
                                <button type="submit" id="submit">Add Game</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </article>
        </section>
    </>
);
};

  export default GameAdd;