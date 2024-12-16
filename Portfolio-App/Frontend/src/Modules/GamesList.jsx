import React from 'react';
import Game from './Game.jsx';

function GameList({ games, onDelete, onEdit }) {
    return (
        <table id="games">
            <caption>Manage Your Games</caption>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Release Year</th>
                    <th>Trophy Name</th>
                    <th>Acquired Date</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {games.map((game, i) =>(
                    <Game
                        game={game}
                        key={i}
                        onDelete={onDelete}
                        onEdit={onEdit}
                    />))}
            </tbody>
        </table>
    );
}

export default GameList;
