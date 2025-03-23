// Citation for node starter project
// Adapted from CS340 node-starter-app
// URL: https://github.com/osu-cs340-ecampus/nodejs-starter-app
// Date Retrieved: March 03, 2025

// Get the objects we need to modify
let addOrderForm = document.getElementById('add-order-form-ajax');

// Modify the objects we need
addOrderForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderDate = document.getElementById("input-orderdate");
    let inputCustomerID = document.getElementById("input-customerid");
    let inputGameID = document.getElementById("input-gameid");
    let inputQuantity = document.getElementById("input-quantity");
    // Get the values from the form fields
    let orderDateValue = inputOrderDate.value;
    let customerIdValue = inputCustomerID.value;
    let gameIdValue = inputGameID.value;
    let quantityValue = inputQuantity.value;
    // Put our data we want to send in a JavaScript object
    let data = {
        orderDate: orderDateValue,
        customerID: customerIdValue,
        gameID: gameIdValue,
        quantity: quantityValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderDate.value = '';
            inputCustomerID.value = '';
            inputGameID.value = '';
            inputQuantity.value = '';

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Creates a single row from an Object representing a single record from orders
addRowToTable = (data) => {

    // Get a reference to the current table on the page
    let currentTable = document.getElementById("orders-table"); // Target <tbody>

    // Parse the response data to get the new order
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    // Create a new row and three cells (for order ID, order date, customer id, game id, quantity, and delete)
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");
    let gameIDCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.orderID;
    orderDateCell.innerText = newRow.orderDate;
    customerIDCell.innerText = newRow.customerID;
    gameIDCell.innerText = newRow.gameID;
    quantityCell.innerText = newRow.quantity;

    deleteCell = document.createElement("button");
    deleteCell.innerHTML = "Delete";
    deleteCell.onclick = function(){
        deleteOrder(newRow.orderID);
    };

    // Append the cells to the row
    row.appendChild(idCell);
    row.appendChild(orderDateCell);
    row.appendChild(customerIDCell);
    row.appendChild(gameIDCell);
    row.appendChild(quantityCell);
    row.appendChild(deleteCell);

    row.setAttribute('data-value', newRow.id);

    // Append the new row to the table
    currentTable.appendChild(row);

    // Find drop down menu, create a new option, fill data in the option (full name, id),
    // then append option to drop down menu so newly created rows via ajax will be found in it without needing a refresh
    let selectMenu = document.getElementById("orderSelect");
    let option = document.createElement("option");
    option.text = newRow.orderDate;
    option.value = newRow.orderID;
    selectMenu.add(option);
}
