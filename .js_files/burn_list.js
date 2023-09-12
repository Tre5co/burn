const today = new Date();   
const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;


const tableBody = document.querySelector("#mutable-table tbody");
let burnItems = {};

function addBurnItem(key, value) {
    burnItems[key] = value;
}

function removeBurnItem(key) {
    delete burnItems[key];
}

function getBurnItem(key) {
    return burnItems[key];
}

function createNewRow() {
    const newRow = document.createElement("tr");

    // Task Index
    const newTaskIndex = document.createElement("td");
    newTaskIndex.className = "first-column";
    newTaskIndex.innerHTML = `${tableBody.children.length + 1} <button class="add-row-button">Add Task</button>`;
    newRow.appendChild(newTaskIndex);

    // Start Date
    const newStartDate = document.createElement("td");
    newStartDate.className = "start-date";
    newStartDate.innerHTML = formattedDate;
    newRow.appendChild(newStartDate);

    // Task
    const newTask = document.createElement("td");
    newTask.className = "burn-item";
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.placeholder = "Enter task here";
    taskInput.addEventListener("keydown", function(e) {
        if (e.key === "Enter" && this.value.trim() !== "") {
            const newTaskText = document.createTextNode(this.value.trim());
            this.replaceWith(newTaskText);
        }
    });
    newTask.appendChild(taskInput);
    newRow.appendChild(newTask);

    // Time Log
    const newTimeLog = document.createElement("td");
    newTimeLog.className = "time-log";

    const logTimeButton = document.createElement("button");
    logTimeButton.className = "log-time-button";
    logTimeButton.textContent = "+1 15min session complete";

    const timeCount = document.createElement("span");
    timeCount.className = "time-count";
    // print the contents of the time-count span
    console.log(burnItems);

    newTimeLog.appendChild(timeCount);
    newTimeLog.appendChild(logTimeButton);
    newRow.appendChild(newTimeLog);

    // Complete
    const newComplete = document.createElement("td");
    newComplete.className = "remove-row";
    newComplete.innerHTML = `${tableBody.children.length + 1} <button class="remove-row-button">Complete</button>`;
    newRow.appendChild(newComplete);

    return newRow;
}

function handleAddRowButtonClick(event) {
    const newRow = createNewRow();
    let parentRow;

    if (event.target.tagName === 'BUTTON') {
        parentRow = event.target.parentElement.parentElement;
    } else if (event.target.tagName === 'TD') {
        parentRow = event.target.parentElement;
    }

    tableBody.insertBefore(newRow, parentRow);
    renumberRows();
}

function handleRemoveRowButtonClick(event) {
    const targetRow = event.target.parentElement.parentElement;
    tableBody.removeChild(targetRow);
    const lastRow = document.querySelector(".last-row");
    targetRow.classList.add("completed-row");
    lastRow.insertAdjacentElement("afterend", targetRow);
    renumberRows();
}

function handleLogTimeButtonClick(event) {
    const targetCell = event.target.parentElement;
    const parentRow = targetCell.parentElement;
    const burnItemCell = parentRow.querySelector(".burn-item");
    const burnItem = burnItemCell.textContent;
    const timeLogSpan = targetCell.querySelector(".time-count");

    if (timeLogSpan) {
        var totalTime = parseInt(timeLogSpan.textContent, 10);
        totalTime += 1;
        timeLogSpan.textContent = totalTime;
    } else {
        console.error("Time log span not found")
    }
    if (burnItem != "") {
        removeBurnItem(burnItem);
        addBurnItem(burnItem, totalTime);
    }
}

tableBody.addEventListener("click", function(event) {
    if (event.target.classList.contains("add-row-button") || 
        event.target.parentElement.classList.contains("add-row-button")) {
        handleAddRowButtonClick(event);
    } else if (event.target.classList.contains("remove-row-button")) {
        handleRemoveRowButtonClick(event);
    } else if (event.target.classList.contains("log-time-button")) {
        handleLogTimeButtonClick(event);
    }
});

function renumberRows() {
    // Time spent = "Time taken" if below last row
    // Start-date and end date displayed.
    const rows = Array.from(tableBody.querySelectorAll("tr"));
    var lastRowIndex = -1;
    for(let i = 0; i < rows.length; i++) {
        if(rows[i].classList.contains("last-row")) {
            lastRowIndex = i;
        }
    }
    rows.forEach((row, index) => {
        const firstColumn = row.querySelector(".first-column");
        firstColumn.textContent = `${index + 1}`;

        const lastColumn = row.querySelector(".remove-row");
        lastColumn.textContent = "$";

        let loggedTime = 0;
        const timeLogColumn = row.querySelector(".time-log");
        timeLogColumn.textContent = loggedTime;

        if (index <= lastRowIndex) {
            const addButton = document.createElement("button");
            addButton.className = "add-row-button";
            addButton.textContent = "Add Task";
            firstColumn.appendChild(addButton);
        }

        if (index <= lastRowIndex-1) {
            lastColumn.innerHTML = `<button class="remove-row-button">Complete</button>`;

            const logTimeButton = document.createElement("button");
            logTimeButton.className = "log-time-button";
            logTimeButton.textContent = "+1 15min session complete";

            //get text from current burn item cell
            const burnItemCell = row.querySelector(".burn-item");
            const burnItem = burnItemCell.textContent;

            const timeCountSpan = document.createElement("span");
            timeCountSpan.className = "time-count";
            timeCountSpan.textContent = "0";
            if (burnItem != "") {
                timeCountSpan.textContent = burnItems[burnItem];
            }
            // print the contents of the time-count span
            console.log(timeCountSpan.textContent);

            timeLogColumn.innerHTML = ""
            timeLogColumn.appendChild(timeCountSpan);
            timeLogColumn.appendChild(logTimeButton);
        } else { lastColumn.innerHTML = ""; }
    });
}