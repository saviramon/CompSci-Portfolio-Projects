// Citation for node starter project
// Adapted from CS340 node-starter-app
// URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Date Retrieved: March 03, 2025

// Get the objects we need to modify
let addDeveloperForm = document.getElementById('add-developer-form-ajax');

// Modify the objects we need
addDeveloperForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");

    // Get the values from the form fields
    let nameValue = inputName.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        name: nameValue,
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-developer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputName.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Creates a single row from an Object representing a single record from Developers
addRowToTable = (data) => {

    // Get a reference to the current table on the page
    let currentTable = document.getElementById("developers-table"); // Target <tbody>

    // Parse the response data to get the new developer
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    // Create a new row and three cells (for developer ID, name, and delete)
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.developerID;
    nameCell.innerText = newRow.name;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteDeveloper(newRow.developerID);
    };

    // Append the cells to the row
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.id);

    // Append the new row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("mySelect");
    let option = document.createElement("option");
    option.text = newRow.name;
    option.value = newRow.developerID;
    selectMenu.add(option);
}
