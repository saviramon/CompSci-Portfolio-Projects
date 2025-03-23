// Citation for node starter project
// Adapted from CS340 node-starter-app
// URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Date Retrieved: Feb 26, 2025

// Get the objects we need to modify
let updateGameForm = document.getElementById('update-game-form-ajax');

// Modify the objects we need
updateGameForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputID = document.getElementById("update-id");
    let inputTitle = document.getElementById("update-title");
    let inputDeveloper = document.getElementById("update-developer");
    let inputGenre = document.getElementById("update-genre");
    let inputRelease = document.getElementById("update-releasedate");
    let inputPrice = document.getElementById("update-price");
    let inputPlatform = document.getElementById("update-platform");
    let inputCondition = document.getElementById("update-condition");
    let inputInStock = document.getElementById("update-instock");

    // Get the values from the form fields
    let IDValue = inputID.value;
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
        gameID: IDValue,
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
    xhttp.open("PUT", "/update-game-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            //updateRow(xhttp.response);

            // Clear the input fields for another transaction
            inputID.value = '';
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