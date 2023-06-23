const inputField = document.querySelector(".input-field textarea");
const todolist = document.querySelector(".todoLists");
const pendingNum = document.querySelector(".pending-num");
const clearButton = document.querySelector(".clear-button");
const dueDateValue = document.querySelector(".due-date-input");
const createTaskButton = document.querySelector(".create-button");

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

inputField.addEventListener("keyup", (e) => {
  let inputval = inputField.value.trim();
  let dueDateVal = dueDateValue.value || "";

  if (e.key === "Enter" && inputval.length > 0) {
    createTask(inputval, dueDateVal);
  }
});

function createTask(task, dueDate) {
  let formattedDueDate = ""; // Initialize formattedDueDate as empty

  if (dueDate) {
    // Format the dueDate using toLocaleDateString()
    formattedDueDate = new Date(dueDate).toLocaleDateString();
  }

  let liTag = `<div class="listOfTasks">
  <li class="list pending" onclick="handleStatus(this)">
    <input type="checkbox"/>
    <span class="task">${task}</span>
    <span class="due-date">${formattedDueDate}</span>
    <i class="fas fa-trash" onclick="deleteTask(this)"></i>
  </li>
</div>
  `;

  todolist.insertAdjacentHTML("beforeend", liTag);
  inputField.value = "";
  dueDateValue.value = "";
  allTasks();
}

function handleStatus(e) {
  const checkbox = e.querySelector("input");
  checkbox.checked = !checkbox.checked;
  e.classList.toggle("pending");
  allTasks();
}

function deleteTask(e) {
  e.parentElement.remove();
  allTasks();
}

clearButton.addEventListener("click", () => {
  todolist.innerHTML = "";
  dueDateValue.value = "";
  allTasks();
});

createTaskButton.addEventListener("click", () => {
  let inputval = inputField.value.trim();
  let dueDateVal = dueDateValue.value || "";

  if (inputval.length > 0) {
    createTask(inputval, dueDateVal);
  }
});

document.addEventListener("keydown", (e) => {
  let inputval = inputField.value.trim();
  let dueDateVal = dueDateValue.value || "";

  if (e.key === "Enter" && inputval.length > 0) {
    e.preventDefault(); // Prevent the default behavior of the keydown event
    createTask(inputval, dueDateVal);
  }
});
