// Citation for node starter project
// Adapted from CS340 node-starter-app
// URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Date Retrieved: March 03, 2025

// Get the objects we need to modify
let updateCustomersForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomersForm.addEventListener("submit", function (e) {
   
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputCustomerID = document.getElementById("customerSelect");
    let inputFirstName = document.getElementById("update-fname");
    let inputLastName = document.getElementById("update-lname");
    let inputEmail = document.getElementById("update-email");
    let inputPhoneNumber = document.getElementById("update-phone");

    // Get the values from the form fields
    let customerIDValue = inputCustomerID.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let emailValue = inputEmail.value;
    let phoneNumberValue = inputPhoneNumber.value;
    
    // currently the database table for Orders does not allow updating values to NULL
    // so we must abort if being bassed NULL for customerID
    if (isNaN(customerIDValue)) 
        {
            return;
        }
    // Put our data we want to send in a javascript object
    let data = {
        customerID: customerIDValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        phoneNumber: phoneNumberValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/update-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            //updateRow(xhttp.response, data);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function updateRow(data, orderID){
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("customers-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
       //iterate through rows
       //rows would be accessed using the "row" variable assigned in the for loop
       if (table.rows[i].getAttribute("data-value") == customerID) {

            // Get the location of the row where we found the matching developer ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of developer value
            let td = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign developer to our value we updated to
            td.innerHTML = parsedData[0].name; 
       }
    }
}