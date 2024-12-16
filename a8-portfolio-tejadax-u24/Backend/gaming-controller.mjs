// Controllers for the Game Collection

import 'dotenv/config';
import express from 'express';
import * as games from './gaming-model.mjs';

const PORT = process.env.PORT;
const app = express();
app.use(express.json());  // REST needs JSON MIME type.


// CREATE controller ******************************************
app.post ('/games', (req,res) => { 
    games.createGame( 
        req.body.title, 
        req.body.releaseYear, 
        req.body.trophyName,
        req.body.acquireDate
        )
        .then(games => {
            console.log(`"${games.title}" was added to the collection.`);
            res.status(201).json(games);
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: "The requested game was not added to the collection." });
        });
});


// RETRIEVE controller ****************************************************
app.get('/games', (req, res) => {
    games.retrieveGame()
        .then(games => { 
            if (games !== null) {
                console.log("All games have been retrieved from the collection.");
                res.json(games);
            } else {
                res.status(404).json({ Error: "Game collection could not be retrieved." });
            }         
         })
        .catch(error => {
            console.log(error);
            res.status(400).json({ Error: "No games are in the collection." });
        });
});


// RETRIEVE by ID controller
app.get('/games/:_id', (req, res) => {
    games.retrieveGameByID(req.params._id)
    .then(games => { 
        if (games !== null) {
            console.log(`"${games.title}" was retrieved, based on its ID.`);
            res.json(games);
        } else {
            res.status(404).json({ Error: "The game you are searching for could not be not retrieved, based on its ID."});
        }         
     })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: "Game id is unknown, and could not retrieve collection." });
    });

});


// UPDATE controller ************************************
app.put('/games/:_id', (req, res) => {
    games.updateGame(
        req.params._id, 
        req.body.title, 
        req.body.releaseYear, 
        req.body.trophyName,
        req.body.acquireDate
    )
    .then(games => {
        console.log(`"${games.title}" was updated.`);
        res.json(games);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({ Error: `"${games.title}" was not updated.`});
    });
});


// DELETE Controller ******************************
app.delete('/games/:_id', (req, res) => {
    games.deleteGameById(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                console.log(`Based on its ID, ${deletedCount} game was deleted.`);
                res.status(200).send({ Success: "Your desired game was deleted from the collection" });
            } else {
                res.status(404).json({ Error: "Based on the given ID, no games were deleted." });
            }
        })
        .catch(error => {
            console.error(error);
            res.send({ Error: `No games were found with that ID, therefore no games were deleted.` });
        });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});