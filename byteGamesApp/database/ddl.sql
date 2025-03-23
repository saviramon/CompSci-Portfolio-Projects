-- Christian Duval --
-- X'avier Tejada --

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Create Developers table --
CREATE OR REPLACE TABLE `Developers` (
    `developerID` INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL
);

-- Creates Games table --
CREATE OR REPLACE TABLE `Games` (
    `gameID` INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `title` VARCHAR(100) NOT NULL,
    `developerID` INT(11) NOT NULL,
    `genre` VARCHAR(100) NOT NULL,
    `releaseDate` DATE NOT NULL,
    `price` DECIMAL(5,2) NOT NULL,
    `platform` VARCHAR(100) NOT NULL,
    `game_condition` TINYINT(1) NOT NULL,
    `quantityInStock` INT NOT NULL,
    CONSTRAINT `developerfk1` FOREIGN KEY (`developerID`) REFERENCES `Developers`(`developerID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
-- Creates Customers table --
CREATE OR REPLACE TABLE `Customers` (
    `customerID` INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `firstName` VARCHAR(100) NOT NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) UNIQUE DEFAULT NULL,
    `phoneNumber` VARCHAR(10) DEFAULT NULL
);

-- Creates Orders table --
CREATE OR REPLACE TABLE `Orders` (
    `orderID` INT(11) AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `orderDate` DATE NOT NULL,
    `customerID` INT(11) NOT NULL,
    `gameID` INT NOT NULL,
    `quantity` INT NOT NULL,
    CONSTRAINT `customerfk1` FOREIGN KEY (`customerID`) REFERENCES `Customers`(`customerID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    CONSTRAINT `gamefk1` FOREIGN KEY (`gameID`) REFERENCES `Games`(`gameID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- Creates OrdersGames intersection table --
CREATE OR REPLACE TABLE `OrdersGames`(
    `orderID` INT(11) NOT NULL,
    `gameID` INT(11) NOT NULL,
    `quantity` INT(11),
    PRIMARY KEY (`orderID`, `gameID`),
    FOREIGN KEY (`orderID`) REFERENCES `Orders`(`orderID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`gameID`) REFERENCES `Games`(`gameID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


-- Inserts sample data into Developers table --
INSERT INTO Developers (name)
VALUES
('Game Freak'),
('Nintendo'),
('Square Enix'),
('Bungie');

-- Inserts sample data into Games table --
INSERT INTO Games (title, developerID, genre, releaseDate, price, platform, game_condition, quantityInStock) 
VALUES 
('Pokemon Sapphire', (SELECT developerID FROM Developers WHERE name = 'Game Freak'), 'RPG', '2003-10-15', 80, 'Game Boy Advance', 0, 3),
('Super Mario World', (SELECT developerID FROM Developers WHERE name = 'Nintendo'), 'platformer', '1990-11-21', 500, 'Super Nintendo', 1, 1),
('The Legend of Zelda: Ocarina of Time', (SELECT developerID FROM Developers WHERE name = 'Nintendo'), 'Adventure', '1998-11-23', 150, 'Nintendo 64', 0, 2),
('Final Fantasy VII', (SELECT developerID FROM Developers WHERE name = 'Square Enix'), 'RPG', '1997-01-31', 125, 'Playstation 1', 0, 6),
('Halo: Combat Evolved', (SELECT developerID FROM Developers WHERE name = 'Bungie'), 'FPS', '2001-11-15', 135, 'Xbox', 1, 5);

-- Inserts sample data into Customers table --
INSERT INTO Customers (firstName, lastName, email, phoneNumber)
VALUES
('Liam', 'Smith', 'liam.smith@oregonstate.edu', '9151234567'),
('Olivia', 'Johnson', 'olivia.johnson@yahoo.com', '3219876543'),
('Noah', 'Williams', NULL, '8085554655'),
('Emma', 'Brown', 'emma.brown@gmail.com', '2051137222'),
('William', 'Jones', 'william.jones@aol.com', '3613456444'),
('Ava', 'Garcia', 'ava.garcia@bot.com', '8006667777');

-- Inserts sample data into Orders table --
INSERT INTO Orders (orderDate, customerID, gameID, quantity)
VALUES
('2025-06-15', (SELECT customerID FROM Customers WHERE firstName = 'Liam' AND lastName = 'Smith'), (SELECT gameID FROM Games WHERE title ='Pokemon Sapphire'), 1),
('2025-06-22', (SELECT customerID FROM Customers WHERE firstName = 'Olivia' AND lastName = 'Johnson'), (SELECT gameID FROM Games WHERE title ='Final Fantasy VII'), 2),
('2025-07-01', (SELECT customerID FROM Customers WHERE firstName = 'Noah' AND lastName = 'Williams'), (SELECT gameID FROM Games WHERE title ='Pokemon Sapphire'), 1),
('2025-07-08', (SELECT customerID FROM Customers WHERE firstName = 'Emma' AND lastName = 'Brown'), (SELECT gameID FROM Games WHERE title ='Final Fantasy VII'), 3),
('2025-07-15', (SELECT customerID FROM Customers WHERE firstName = 'William' AND lastName = 'Jones'), (SELECT gameID FROM Games WHERE title ='Pokemon Sapphire'), 1),
('2025-07-22', (SELECT customerID FROM Customers WHERE firstName = 'Liam' AND lastName = 'Smith'), (SELECT gameID FROM Games WHERE title ='Halo: Combat Evolved'), 1),
('2025-08-01', (SELECT customerID FROM Customers WHERE firstName = 'Ava' AND lastName = 'Garcia'), (SELECT gameID FROM Games WHERE title ='The Legend of Zelda: Ocarina of Time'), 1),
('2025-08-08', (SELECT customerID FROM Customers WHERE firstName = 'Olivia' AND lastName = 'Johnson'), (SELECT gameID FROM Games WHERE title ='Pokemon Sapphire'), 1);

-- Inserts sample data into OrdersGames table --
INSERT INTO OrdersGames (orderID, gameID, quantity)
VALUES
((SELECT orderID FROM Orders WHERE orderDate = '2025-06-15' AND customerID = (SELECT customerID FROM Customers WHERE firstName = 'Liam' AND lastName = 'Smith')), (SELECT gameID FROM Games WHERE title = 'Pokemon Sapphire'), 1),
((SELECT orderID FROM Orders WHERE orderDate = '2025-06-22' AND customerID = (SELECT customerID FROM Customers WHERE firstName = 'Olivia' AND lastName = 'Johnson')), (SELECT gameID FROM Games WHERE title = 'Final Fantasy VII'), 2),
((SELECT orderID FROM Orders WHERE orderDate = '2025-07-01' AND customerID = (SELECT customerID FROM Customers WHERE firstName = 'Noah' AND lastName = 'Williams')), (SELECT gameID FROM Games WHERE title = 'Pokemon Sapphire'), 1),
((SELECT orderID FROM Orders WHERE orderDate = '2025-07-08' AND customerID = (SELECT customerID FROM Customers WHERE firstName = 'Emma' AND lastName = 'Brown')), (SELECT gameID FROM Games WHERE title = 'Final Fantasy VII'), 3),
((SELECT orderID FROM Orders WHERE orderDate = '2025-07-15' AND customerID = (SELECT customerID FROM Customers WHERE firstName = 'William' AND lastName = 'Jones')), (SELECT gameID FROM Games WHERE title = 'Pokemon Sapphire'), 1),
((SELECT orderID FROM Orders WHERE orderDate = '2025-07-22' AND customerID = (SELECT customerID FROM Customers WHERE firstName = 'Liam' AND lastName = 'Smith')), (SELECT gameID FROM Games WHERE title = 'Halo: Combat Evolved'), 1),
((SELECT orderID FROM Orders WHERE orderDate = '2025-08-01' AND customerID = (SELECT customerID FROM Customers WHERE firstName = 'Ava' AND lastName = 'Garcia')), (SELECT gameID FROM Games WHERE title = 'The Legend of Zelda: Ocarina of Time'), 1),
((SELECT orderID FROM Orders WHERE orderDate = '2025-08-08' AND customerID = (SELECT customerID FROM Customers WHERE firstName = 'Olivia' AND lastName = 'Johnson')), (SELECT gameID FROM Games WHERE title = 'Pokemon Sapphire'), 1);

SET FOREIGN_KEY_CHECKS=1;
COMMIT;