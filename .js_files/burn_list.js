const tableBody = document.querySelector("#mutable-table tbody");
tableBody.addEventListener("click", function(event) {
    if (event.target.classList.contains("add-row-button") || 
        event.target.parentElement.classList.contains("add-row-button")) {
        
        const newRow = document.createElement("tr");

        const newTaskIndex = document.createElement("td");
        newTaskIndex.className = "first-column";
        newTaskIndex.innerHTML = `${tableBody.children.length + 1} <button class="add-row-button">Add Task</button>`;
        newRow.appendChild(newTaskIndex);

        const newTask = document.createElement("td");
        newTask.className = "burn-item";

        const taskInput = document.createElement("input");
        taskInput.type = "text";
        taskInput.placeholder = "Enter task here";

        taskInput.addEventListener("keydown", function(e) {
            if (e.key === "Enter" && this.value.trim() !== "") {
                // Create a text node for the task's text
                const taskText = document.createTextNode(this.value.trim());

                // Create the remove button
                const removeButton = document.createElement("button");
                removeButton.className = "remove-row-button";
                removeButton.textContent = "Remove";

                // Replace the input with the taskText and the button
                this.replaceWith(taskText, removeButton);            
            }
        })

        newTask.appendChild(taskInput);
        newRow.appendChild(newTask);

        let parentRow;
        if (event.target.tagName === 'BUTTON') {
            parentRow = event.target.parentElement.parentElement; // The <td> is the parent and <tr> is the grandparent
        } else if (event.target.tagName === 'TD') {
            parentRow = event.target.parentElement;
        }

        // Insert the new row after the parent row

        tableBody.insertBefore(newRow, parentRow);

        renumberRows();
    }

    if (event.target.classList.contains("remove-row-button")) {
        tableBody.removeChild(event.target.parentElement.parentElement);
        renumberRows();
    }
});
//Event delegation

function renumberRows() {
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach((row, index) => {
        const firstColumn = row.querySelector(".first-column");
        firstColumn.textContent = `${index + 1}`;
        const addButton = document.createElement("button");
        addButton.className = "add-row-button";
        addButton.textContent = "Add Task";
        firstColumn.appendChild(addButton);
    });
}

taskInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter" && this.value.trim() !== "") {
        // Create a text node for the entered task
        const taskText = document.createTextNode(this.value.trim());
        
        // Create the remove button
        const removeButton = document.createElement("button");
        removeButton.className = "remove-row-button";
        removeButton.textContent = "Remove";
        
        // Append both the task and the remove button to the parent TD
        const parentTD = this.parentElement;
        parentTD.innerHTML = ''; // Clear the TD contents (removing the input box)
        parentTD.appendChild(taskText);
        parentTD.appendChild(removeButton);

        // No need for replaceWith anymore
    }
});