window.onload = () => {
    userName();
}

userName = () => {
    const name = prompt("Enter your name: ");
    if (name) {
        var change = document.getElementById('name');
        change.innerText = name + "\'s Todo List";
    }
}

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newList = document.createElement('li');
    newList.innerText = todoInput.value;
    newList.classList.add('todo-item');
    todoDiv.appendChild(newList);

    saveLocalTodos(todoInput.value);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check-square"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);

    todoInput.nodeValue = '';
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;

        todo.classList.add("fall");
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });

    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
            case "pending":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                }
                else {
                    todo.style.display = 'none';
                }
        }
    });

}

function saveLocalTodos(todo) {

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(totdo);
    localStorage.setItem('todos', JSON.stringify(todos));
}