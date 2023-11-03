// store all todos in use
let todos = [];

// variables with IDs of static elements
const todoListId = "todo-list";
const todoFormId = "new-todo";

// some elements we need to "target"
const todoList = document.getElementById(todoListId);
const todoForm = document.getElementById(todoFormId);

// class(es) needed for adjustments
const todoDoneClass = "text-decoration-line-through";

// retrieves a todo by id from todos array
const getTodo = (id) => {
  return todos.find((item) => item.id === id);
};

// Create new todo object
const newTodoObj = (text, id, done = false) => {
  return {
    text,
    id,
    done,
  };
};

// ---- ADD NEW TODO ---- //
const addTodo = (event) => {
  event.preventDefault();
  const inputField = todoForm.querySelector("input");

  // no empty texts!
  if (!inputField.value) return;

  // create todo object and push to current todos (and save)
  const newTodo = newTodoObj(inputField.value, window.crypto.randomUUID());
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));

  // add todo to document
  createTodo(newTodo);

  // clear field
  inputField.value = "";
};

// ---- CREATE TODO ELEMENT ---- //
const createTodo = (newTodo) => {
  // create new div container for todo item
  const newTodoElement = document.createElement("div");
  const newTodoElementClasses = ["row", "d-flex", "justify-content-center", "align-items-center", "h-100", "my-2"];

  newTodoElement.classList.add(...newTodoElementClasses);
  newTodoElement.id = newTodo.id;

  // Done button
  const doneBtn = document.createElement("button");
  const doneBtnClasses = ["btn", "btn-success", "col-1", "text-white", "w-5"];

  doneBtn.classList.add(...doneBtnClasses);
  doneBtn.innerHTML = `<i class="bi bi-check">`;
  doneBtn.addEventListener("click", () => toggleTodoDone(newTodo.id));

  newTodoElement.appendChild(doneBtn);

  // Todo text
  const todoText = document.createElement("h4");
  const todoTextClasses = ["col-9", "m-0"];

  todoText.classList.add(...todoTextClasses);
  if (newTodo.done) todoText.classList.add(todoDoneClass);
  todoText.innerHTML = newTodo.text;
  newTodoElement.appendChild(todoText);

  // Edit button
  const editBtn = document.createElement("button");
  const editBtnClasses = ["btn", "btn-warning", "col-1", "text-white", "w-5", "me-2"];

  editBtn.classList.add(...editBtnClasses);
  editBtn.innerHTML = `<i class="bi bi-pen"></i>`;
  editBtn.addEventListener("click", () => editTodo(newTodo.id));
  newTodoElement.appendChild(editBtn);

  // Delete button
  const deleteBtn = document.createElement("button");
  const deleteBtnClasses = ["btn", "btn-danger", "col-1", "text-white", "w-5"];

  deleteBtn.classList.add(...deleteBtnClasses);
  deleteBtn.innerHTML = `<i class="bi bi-trash"></i>`;
  deleteBtn.addEventListener("click", () => deleteTodo(newTodo.id));
  newTodoElement.appendChild(deleteBtn);

  // Add to list
  todoList.appendChild(newTodoElement);
};

// ---- MARK TODO AS DONE ---- //
const toggleTodoDone = (id) => {
  const targetTodo = getTodo(id);
  const todoTextElem = document.querySelector(`[id="${id}"] h4`);

  targetTodo.done = !targetTodo.done;
  updateAndSaveTodos(id, null, targetTodo.done);

  if (targetTodo.done) todoTextElem.classList.add(todoDoneClass);
  else todoTextElem.classList.remove(todoDoneClass);
};

// ---- EDIT TODO ---- //
const editTodo = (id) => {
  const targetTodo = getTodo(id);
  let newText = prompt(`Please enter new text below:`, targetTodo.text);
  newText = newText ?? targetTodo.text;

  // find and update todo in array
  updateAndSaveTodos(id, newText, targetTodo.done);

  // update existing item
  document.querySelector(`[id="${id}"] h4`).innerHTML = newText;
};

// ---- UPDATE TODO IN LOCAL STORAGE ---- //
const updateAndSaveTodos = (id, newText = null, done = false) => {
  const targetTodo = getTodo(id);

  if (newText) targetTodo.text = newText;
  targetTodo.done = done;

  localStorage.setItem("todos", JSON.stringify(todos));
};

// ---- REMOVE TODO ---- //
const deleteTodo = (id) => {
  const itemToDelete = document.getElementById(id);
  todoList.removeChild(itemToDelete);

  const itemIndex = todos.findIndex((item) => item.id === id);
  todos.splice(itemIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos));
};

// ---- LOAD FROM LOCAL STORAGE ---- //
const loadSavedTodos = () => {
  const savedTodos = JSON.parse(localStorage.getItem("todos"));

  if (!savedTodos) todos = [];
  else todos = savedTodos;

  // start "drawing" todos
  todos.forEach((todo) => createTodo(todo));
};

// ---- ADD EVENT LISTENERS ---- //
todoForm.addEventListener("submit", addTodo);
addEventListener("load", () => loadSavedTodos());
