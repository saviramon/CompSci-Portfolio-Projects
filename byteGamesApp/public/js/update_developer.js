// Citation for node starter project
// Adapted from CS340 node-starter-app
// URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Date Retrieved: March 03, 2025

// Get the objects we need to modify
let updateDeveloperForm = document.getElementById('update-developer-form-ajax');

// Modify the objects we need
updateDeveloperForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputDeveloperID = document.getElementById("mySelect");
    let inputName = document.getElementById("update-name");

    // Get the values from the form fields
    let developerIDValue = inputDeveloperID.value;
    let nameValue = inputName.value;
    
    // currently the database table for bsg_people does not allow updating values to NULL
    // so we must abort if being bassed NULL for developerID
    if (isNaN(developerIDValue)) 
        {
            return;
        }
    // Put our data we want to send in a javascript object
    let data = {
        developerID: developerIDValue,
        name: nameValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-developer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateRow(xhttp.response, nameValue);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})


function updateRow(data, developerID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("developers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == developerID) {

            // Get the location of the row where we found the matching developer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of developer value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign developer to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}