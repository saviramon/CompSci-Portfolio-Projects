// Citation for node starter project
// Adapted from CS340 node-starter-app
// URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Date Retrieved: Feb 26, 2025

// App.js

/* SETUP */
var express = require('express');
var app     = express();
PORT        = 6451;

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');
app.engine('.hbs', engine({extname: ".hbs"}));
app.set('view engine', '.hbs');

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

/* 
    Database
*/
var db = require('./database/db-connector')

/* 
    Routes 
*/
app.get('/', function(req, res)
{  
    res.render('index');
});

app.get('/games', function(req, res) {
    // Query for the Games table
    let query1 = `
        SELECT 
            gameID, 
            title, 
            developerID, 
            genre, 
            DATE_FORMAT(releaseDate, '%m/%d/%Y') AS releaseDate,
            price, 
            platform, 
            game_condition, 
            quantityInStock 
        FROM Games;
    `;    
    db.pool.query(query1, function(error, gamesRows, fields) {
        // Query for the Developers table
        let query2 = "SELECT * FROM Developers;";

        db.pool.query(query2, function(error, developersRows, fields) {
            // Now render the 'games' 'developers' view and pass both datasets
            res.render('games', {
                games: gamesRows,
                developers: developersRows
            });
        });
    });
});



app.get('/developers', function(req, res)
{  
    let query1 = "SELECT * FROM Developers;";

    db.pool.query(query1, function(error, rows, fields){
        
        res.render('developers', {data: rows}); 
    }) 
});

app.get('/customers', function(req, res)
{  
    let query1 = "SELECT * FROM Customers;"; 

    db.pool.query(query1, function(error, rows, fields){ 
        
        res.render('customers', {data: rows}); 
    })                                                 
});

app.get('/orders', function(req, res)
{  
    let query1 = `
    SELECT 
        orderID, 
        DATE_FORMAT(orderDate, '%m/%d/%Y') AS orderDate,
        customerID, 
        gameID,
        quantity 
    FROM Orders;
`;

    db.pool.query(query1, function(error, orderRows, fields) {
        // Query for the Developers table
        let query2 = "SELECT * FROM Customers;";

        db.pool.query(query2, function(error, customerRows, fields) {
            // Now render the 'games' view and pass both datasets
            let query3 = "SELECT * FROM Games;";

            db.pool.query(query3, function(error, gameRows, fields) {
                res.render('orders', {
                    orders: orderRows,
                    customers: customerRows,
                    games: gameRows
                });
            });
        });
    });
});

app.get('/ordersgames', function(req, res)
{  
    let query1 = "SELECT * FROM OrdersGames;"; 

    db.pool.query(query1, function(error, rows, fields){
        
        res.render('ordersgames', {data: rows});
    })
});

// Adds a game to Games
app.post('/add-game-ajax', function(req, res) 
{
    let data = req.body;
    
    query1 = `INSERT INTO Games (title, developerID, genre, releaseDate, price, platform, game_condition, quantityInStock) 
    VALUES ('${data.title}', ${data.developerID}, '${data.genre}', '${data.releaseDate}', ${data.price}, '${data.platform}', ${data.condition}, ${data.quantityInStock})`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Games;`;
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Updates a game in Games
app.put('/update-game-ajax', function(req, res, next)
{
    let data = req.body;
    query1 = `UPDATE Games SET title = '${data.title}', developerID = ${data.developerID},
    genre = '${data.genre}', releaseDate = '${data.releaseDate}', price = ${data.price},
    platform = '${data.platform}', game_condition = ${data.condition}, quantityInStock = ${data.quantityInStock}
    WHERE gameID = ${data.gameID};`;
    
    selectGames = `SELECT * FROM Games;`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            db.pool.query(selectGames, function(error, rows, fields) {
        
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

// deletes a game from Games
app.delete('/delete-game-ajax', function(req, res, next)
{
    let data = req.body;
    query1 = `DELETE FROM Games WHERE gameID = ${data.gameID};`;
    
    db.pool.query(query1, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

// Adds a developer to Developers
app.post('/add-developer-ajax', function(req, res) 
{
    let data = req.body;
    
    query1 = `INSERT INTO Developers (name) 
    VALUES ('${data.name}')`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Developers;`;
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
    
});

// Update Developer
app.put('/put-developer-ajax', function(req, res, next) {
    let data = req.body;

    let name = data.name;
    let developerID = data.developerID; 

    let queryUpdateDeveloper = `UPDATE Developers SET name = ? WHERE developerID = ?`;
    let developerNameQuery = `SELECT * FROM Developers WHERE developerID = ?`;

    // Run the first query to update the developer's name
    db.pool.query(queryUpdateDeveloper, [name, developerID], function(error, result) {
        if (error) {

            console.log(error);
            return res.sendStatus(400);
        }
       else
       {
        db.pool.query(developerNameQuery, [developerID], function(error, rows) {
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.send(rows);
            }
        })
    }
})});

// Delete Developer
app.delete('/delete-developer-ajax/', function(req,res,next){
    let data = req.body;

    let developerID = data.id;
    let deleteDeveloperID = `DELETE FROM Developers WHERE developerID = ?`;
  
  
    db.pool.query(deleteDeveloperID, [developerID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'An error occurred while deleting the developer' });
        }
        else{
            res.status(204).send(rows);   
        }
        
    });
});

// Adds a order to Orders
app.post('/add-order-ajax', function(req, res) 
{
    let data = req.body;
    
    console.log('form data:', {
        data
    });

    query1 = `INSERT INTO Orders (orderDate, customerID, gameID, quantity) 
    VALUES ('${data.orderDate}', ${data.customerID}, ${data.gameID}, ${data.quantity})`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Orders;`;
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});


// Update Order
app.put('/put-order-ajax', function(req, res, next) {
    let data = req.body;

    let orderID = parseInt(data.orderID);
    let orderDate = data.orderDate;
    let customerID = parseInt(data.customerID);
    let gameID = parseInt(data.gameID);
    let quantity = parseInt(data.quantity);
     
    let queryUpdateOrder = `UPDATE Orders SET orderDate = ?, customerID = ?, gameID = ?, quantity = ? WHERE orderID = ?`;
    let orderQuery = `SELECT * FROM Orders WHERE orderID = ?`;

    // Run the first query to update the developer's name
    db.pool.query(queryUpdateOrder, [orderDate, customerID, gameID, quantity, orderID], function(error, result) {
        if (error) {

            console.log(error);
            return res.sendStatus(400);
        }
       else
       {
        db.pool.query(orderQuery, [orderID], function(error, rows) {
            if (error) {
                console.log(error);
                res.sendStatus(400);
            } else {
                res.send(rows);
            }
        })
    }
})});

// Delete Order
app.delete('/delete-order-ajax/', function(req,res,next){
    let data = req.body;

    let orderID = data.id;
    let deleteOrderID = `DELETE FROM Orders WHERE orderID = ?`;
  
  
    db.pool.query(deleteOrderID, [orderID], function(error, rows, fields) {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'An error occurred while deleting the order' });
        }
        else{
            res.status(204).send(rows);   
        }
        
    });
});

// Add Customer

app.post('/add-customer-ajax', function(req, res) 
{
    let data = req.body;
    
    query1 = `INSERT INTO Customers (firstName, lastName, email, phoneNumber) 
    VALUES ('${data.firstName}', '${data.lastName}', '${data.email}', '${data.phoneNumber}')`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM Customers;`;
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Update Customer

app.put('/update-customer-ajax', function(req, res, next)
{
    let data = req.body;
    query1 = `UPDATE Customers SET firstName = '${data.firstName}', lastName = '${data.lastName}',
    email = '${data.email}', phoneNumber = '${data.phoneNumber}'
    WHERE customerID = ${data.customerID};`;
    
    selectCustomers = `SELECT * FROM Customers;`;

    db.pool.query(query1, function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        }
        else
        {
            db.pool.query(selectCustomers, function(error, rows, fields) {
        
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            })
        }
    })
});

// Delete Customer

app.delete('/delete-customer-ajax', function(req, res, next)
{
    let data = req.body;
    query1 = `DELETE FROM Customers WHERE customerID = ${data.id};`;
    
    db.pool.query(query1, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

// Add OrderGame

app.post('/add-ordergame-ajax', function(req, res) 
{
    let data = req.body;
    
    query1 = `INSERT INTO OrdersGames (orderID, gameID, quantity) 
    VALUES (${data.orderID}, ${data.gameID}, ${data.quantity})`;
    db.pool.query(query1, function(error, rows, fields){

        if (error) {

            console.log(error)
            res.sendStatus(400);
        }
        else
        {
            query2 = `SELECT * FROM OrdersGames;`;
            db.pool.query(query2, function(error, rows, fields){

                if (error) {
                    
                    console.log(error);
                    res.sendStatus(400);
                }
                else
                {
                    res.send(rows);
                }
            })
        }
    })
});

// Delete OrderGame

app.delete('/delete-ordergame-ajax', function(req, res, next)
{
    let data = req.body;
    query1 = `DELETE FROM OrdersGames WHERE orderID = ${data.id};`;
    
    db.pool.query(query1, function(error, rows, fields){
        if (error){
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    })
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
