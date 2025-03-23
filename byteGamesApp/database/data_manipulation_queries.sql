-- ":" is used to denote a variable

-- Browse all games
SELECT * FROM Games;

-- Add a game
INSERT INTO Games (title, developerID, genre, releaseDate, price, platform, game_condition, quantityInStock)
VALUES (:inputTitle, :inputDeveloper, :inputGenre, :inputReleasedate, :inputPrice, :inputPlatform, :inputCondition, :inputInStock);

-- Update game
UPDATE Games SET title = :titleInput, developerID = :developerIDInput,
genre = :genreInput, releaseDate = :releaseDateInput, price = :priceInput,
platform = :platformInput, condition = :conditionInput, quantityInStock = :quantityInStockInput
WHERE gameID = :gameIDInput;

-- Delete game
DELETE FROM Games WHERE gameID = :gameIDInput;

-- Browse all developers
SELECT * FROM Developers;

-- Add a developer
INSERT INTO Developers (name)
Values (:nameInput);

-- Update developer
UPDATE Developers SET name = :nameInput
WHERE developerID = :developerIDInput;

-- Delete developer
DELETE FROM Developers WHERE developerID = :developerIDInput;

-- Browse all customers
SELECT * FROM Customers;

-- Add a customer
INSERT INTO Customers (firstName, lastName, email, phoneNumber)
Values (:firstNameInput, :lastNameInput, :emailInput, :phoneNumberInput);

-- Update customer
UPDATE Customers SET firstName = :firstNameInput,
lastName = :lastNameInput, email = :emailInput, phoneNumber = :phoneNumberInput
WHERE customerID = :customerIDInput;

-- Delete customer
DELETE FROM Customers WHERE customerID = :customerIDInput;

-- Browse all orders
SELECT * FROM Orders;

-- Add an order
INSERT INTO Orders (orderDate, customerID, gameID, quantity)
VALUES (:orderDateInput, :customerIDInput, :gameIDInput, :quantityInput);

-- Update order
UPDATE Orders SET orderDate = :orderDateInput, 
customerID = :customerIDInput, gameID = gameIDInput, quantity = :quantityInput
WHERE orderID = :orderIDInput;

-- Delete order
DELETE FROM Orders WHERE orderID = :orderIDInput;

-- Browse all OrderGames
SELECT * FROM OrderGames;

-- Add OrderGames
INSERT INTO OrderGames (orderID, gameID, quantity)
VALUES (:orderIDInput, :gameIDInput, :quantityInput);

-- Update OrderGames
UPDATE OrderGames SET orderID = :orderIDInput,
gameID = :gameIDInput, quantity = :quantityInput,
WHERE orderID = :orderIDInput;

-- Delete OrderGame
DELETE FROM OrderGames WHERE orderID = :orderIDInput;
