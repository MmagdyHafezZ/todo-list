// Get references to the required DOM elements
const inputField = document.querySelector(".input-field textarea");
const todolist = document.querySelector(".todoLists");
const pendingNum = document.querySelector(".pending-num");
const clearButton = document.querySelector(".clear-button");
const dueDateValue = document.querySelector(".due-date-input");
const createTaskButton = document.querySelector(".create-button");

// Function to update the pending task count and visibility of clear button
function allTasks() {
  let tasks = document.querySelectorAll(".pending");
  pendingNum.textContent = tasks.length === 0 ? "no" : tasks.length;
  let allLists = document.querySelectorAll(".list");
  if (allLists.length > 0) {
    todolist.style.marginTop = "20px";
    clearButton.style.pointerEvents = "auto";
    return;
  }
  todolist.style.marginTop = "0px";
  clearButton.style.pointerEvents = "none";
}

// Event listener for the input field to create a task when Enter key is pressed
inputField.addEventListener("keyup", (e) => {
  let inputval = inputField.value.trim();
  let dueDateVal = dueDateValue.value || "";

  if (e.key === "Enter" && inputval.length > 0) {
    createTask(inputval, dueDateVal);
  }
});

// Function to create a new task
function createTask(task, dueDate) {
  let formattedDueDate = ""; // Initialize formattedDueDate as empty

  if (dueDate) {
    // Format the dueDate using toLocaleString() for date and time
    formattedDueDate = new Date(dueDate).toLocaleString();
  }

  // Create the HTML markup for the task item
  let liTag = `<div class="listOfTasks">
  <li class="list pending" onclick="handleStatus(this)">
    <input type="checkbox"/>
    <span class="task">${task}</span>
    <span class="due-date">${formattedDueDate}</span>
    <i class="fas fa-trash" onclick="deleteTask(this)"></i>
  </li>
</div>
  `;

  // Add the task item to the todo list
  todolist.insertAdjacentHTML("beforeend", liTag);

  // Clear the input field and due date value
  inputField.value = "";
  dueDateValue.value = "";

  // Update the pending task count and clear button visibility
  allTasks();
}

// Function to handle the status (completed/pending) of a task
function handleStatus(e) {
  const checkbox = e.querySelector("input");
  checkbox.checked = !checkbox.checked;

  // Toggle the completed class instead of removing the task
  e.classList.toggle("completed");
  allTasks();
}

// Function to delete a task
function deleteTask(e) {
  e.parentElement.remove();
  allTasks();
}

// Event listener for the clear button to clear all tasks
clearButton.addEventListener("click", () => {
  todolist.innerHTML = "";
  dueDateValue.value = "";
  allTasks();
});

// Event listener for the create task button to create a task
createTaskButton.addEventListener("click", () => {
  let inputval = inputField.value.trim();
  let dueDateVal = dueDateValue.value || "";

  if (inputval.length > 0) {
    createTask(inputval, dueDateVal);
  }
});

// Event listener for the date input to create a task when the date changes
dueDateValue.addEventListener("change", () => {
  let inputval = inputField.value.trim();
  let dueDateVal = dueDateValue.value || "";

  if (inputval.length > 0) {
    createTask(inputval, dueDateVal);
  }
});

// Event listener for the Enter key to create a task
document.addEventListener("keydown", (e) => {
  let inputval = inputField.value.trim();
  let dueDateVal = dueDateValue.value || "";

  if (e.key === "Enter" && inputval.length > 0) {
    e.preventDefault(); // Prevent the default behavior of the keydown event
    createTask(inputval, dueDateVal);
  }
});
