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

let test = {
    1: "a",
    2: "b",
    3: "c"
};
addToList(test, 2, "d");
console.log(test);

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