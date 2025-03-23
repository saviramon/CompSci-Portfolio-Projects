// Citation for node starter project
// Adapted from CS340 node-starter-app
// URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Date Retrieved: Feb 26, 2025

let deleteGameForm = document.getElementById('delete-game-form-ajax');

deleteGameForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let inputID = document.getElementById("delete-id");

    let IDValue = inputID.value;

    let data = {
        gameID: IDValue
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/delete-game-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {

            // Add the new data to the table
            deleteRow(IDValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the input.")
        }
    }
    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function deleteRow(IDValue){

    let table = document.getElementById("game-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == IDValue) {
            table.deleteRow(i);
            break;
       }
    }
}