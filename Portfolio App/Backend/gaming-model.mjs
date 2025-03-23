// Models for the Game Collection

// Import dependencies.
import mongoose from 'mongoose';
import 'dotenv/config';

// Connect based on the .env file parameters.
mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);
const db = mongoose.connection;

// Confirm that the database has connected and print a message in the console.
db.once("open", (err) => {
    if(err){
        res.status(500).json({ Error: 'Error 500: Server Connection has Failed' });
    } else  {
        console.log('Success: Connected to the Video Game Trophy Collection');
    }
});

// SCHEMA: Define the collection's schema.
const gamesSchema = mongoose.Schema({
	title:    { type: String, required: true },
	releaseYear:   { type: Number, required: true },
	trophyName: { type: String, required: true },
    acquireDate: {type: Date, required: true, min: '2010-01-01', default: Date.now }
});

// Compile the model from the schema 
// by defining the collection name "games".
const games = mongoose.model('Game', gamesSchema);


// CREATE model *****************************************
const createGame = async (title, releaseYear, trophyName, acquireDate) => {
    const newGames = new games({ 
        title: title, 
        releaseYear: releaseYear, 
        trophyName: trophyName, 
        acquireDate: acquireDate
    });
    return newGames.save();
}


// RETRIEVE model *****************************************
// Retrieve all documents and return a promise.
const retrieveGame = async () => {
    const query = games.find();
    return query.exec();
}

// RETRIEVE by ID
const retrieveGameByID = async (_id) => {
    const query = games.findById({_id: _id});
    return query.exec();
}

// DELETE model based on _id  *****************************************
const deleteGameById = async (_id) => {
    const result = await games.deleteOne({_id: _id});
    return result.deletedCount;
};


// UPDATE model *****************************************************
const updateGame = async (_id, title, releaseYear, trophyName, acquireDate) => {
    const result = await games.replaceOne({_id: _id }, 
    {
        title: title, 
        releaseYear: releaseYear, 
        trophyName: trophyName, 
        acquireDate: acquireDate
    }
);
    return { 
        _id: _id, 
        title: title, 
        releaseYear: releaseYear, 
        trophyName: trophyName, 
        acquireDate: acquireDate
    }
}

// EXPORT the variables for use in the controller file.
export { createGame, retrieveGame, retrieveGameByID, updateGame, deleteGameById }