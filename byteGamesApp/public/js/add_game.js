// Citation for node starter project
// Adapted from CS340 node-starter-app
// URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Date Retrieved: Feb 26, 2025

// Get the objects we need to modify
let addPersonForm = document.getElementById('add-game-form-ajax');

// Modify the objects we need
addPersonForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTitle = document.getElementById("input-title");
    let inputDeveloper = document.getElementById("input-developer");
    let inputGenre = document.getElementById("input-genre");
    let inputRelease = document.getElementById("input-releasedate");
    let inputPrice = document.getElementById("input-price");
    let inputPlatform = document.getElementById("input-platform");
    let inputCondition = document.getElementById("input-condition");
    let inputInStock = document.getElementById("input-instock");

    // Get the values from the form fields
    let TitleValue = inputTitle.value;
    let DeveloperValue = inputDeveloper.value;
    let GenreValue = inputGenre.value;
    let ReleaseValue = inputRelease.value;
    let PriceValue = inputPrice.value;
    let PlatformValue = inputPlatform.value;
    let ConditionValue = inputCondition.value;
    let InStockValue = inputInStock.value;
    // Put our data we want to send in a javascript object
    let data = {
        title: TitleValue,
        developerID: DeveloperValue,
        genre: GenreValue,
        releaseDate: ReleaseValue,
        price: PriceValue,
        platform: PlatformValue,
        condition: ConditionValue,
        quantityInStock: InStockValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-game-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTitle.value = '';
            inputDeveloper.value = '';
            inputGenre.value = '';
            inputRelease.value = '';
            inputPrice.value = '';
            inputPlatform.value = '';
            inputCondition.value = '';
            inputInStock.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


// Creates a single row from an Object representing a single record from 
// Games
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("games-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 8 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let titleCell = document.createElement("TD");
    let developerCell = document.createElement("TD");
    let genreCell = document.createElement("TD");
    let releaseCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let platformCell = document.createElement("TD");
    let conditionCell = document.createElement("TD");
    let quantityInStockCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.gameID;
    titleCell.innerText = newRow.title;
    developerCell.innerText = newRow.developerID;
    genreCell.innerText = newRow.genre;
    releaseCell.innerText = newRow.releaseDate;
    priceCell.innerText = newRow.price;
    platformCell.innerText = newRow.platform;
    conditionCell.innerText = newRow.condition;
    quantityInStockCell.innerText = newRow.quantityInStock;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(titleCell);
    row.appendChild(developerCell);
    row.appendChild(genreCell);
    row.appendChild(releaseCell);
    row.appendChild(priceCell);
    row.appendChild(platformCell);
    row.appendChild(conditionCell);
    row.appendChild(quantityInStockCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}