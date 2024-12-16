

import {MdDeleteForever, MdEdit} from 'react-icons/md';
function Game({ game, onEdit, onDelete}) { 
    return (
        <>
            <tr>
                <td>{game.title}</td>
                <td>{game.releaseYear}</td>
                <td>{game.trophyName}</td>
                <td>{game.acquireDate.slice(0,10)}</td>
                <td><MdDeleteForever onClick={() => onDelete(game._id)} /></td>
                <td><MdEdit onClick={() => onEdit(game)} /></td>
            </tr>
        </>
    );
}

export default Game;