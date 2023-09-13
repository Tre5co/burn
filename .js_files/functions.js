// Functions.js
console.log("functions.js loaded");

function addToList(dict, position, item) {
    let length = Object.keys(dict).length;
    // Iterate through a list of intergers from 1 to the length of dict
    for (let i = length; i >= 0; i--) {
        if (i >= position) {
            dict[i+1] = dict[i];
        }
    }
    dict[position] = item;
    return dict;
}

function moveBoxUp(boxId) {
    let box = document.getElementById(boxId);
    let previousRow = box.closest('tr').previousElementSibling;

    if (previousRow) {
        let targetCell = previousRow.querySelector('td:nth-child(2)');
        box.closest('td').removeChild(box);
        targetCell.appendChild(box);
    }
}

function moveBoxDown(boxId) {
    let box = document.getElementById(boxId);
    let nextRow = box.closest('tr').nextElementSibling;

    if (nextRow) {
        let targetCell = nextRow.querySelector('td:nth-child(2)');
        box.closest('td').removeChild(box);
        targetCell.appendChild(box);
    }
}

//Add a widget that returns the y position of the cursor:
function showPosition(event) {
    let x = event.clientX;
    let y = event.clientY;
    let coor = "X coords: " + x + ", Y coords: " + y;
    document.getElementById("demo").innerHTML = coor;
}

document.getElementById("add-column").addEventListener("click", function() {
    // Add new header
    const th = document.createElement("th");
    th.textContent = `Col${document.querySelector("#mutable-table thead tr").children.length + 1}`;
    document.querySelector("#mutable-table thead tr").appendChild(th);

    // Add data cells to each row in the body
    document.querySelectorAll("#mutable-table tbody tr").forEach(row => {
        const td = document.createElement("td");
        td.textContent = `Data${row.children.length + 1}`;
        row.appendChild(td);
    });
});

const newRow = document.createElement("tr");
document.querySelector("#mutable-table thead tr").children.length.forEach(() => {
    const td = document.createElement("td");
    td.textContext = "NewData";
    newRow.appendChild(td);
});
document.querySelector