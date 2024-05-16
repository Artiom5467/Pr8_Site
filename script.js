let todos = [];

// Завантаження даних з Local Storage
function loadTodos() {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
        todos = storedTodos;
    }
}

// зберігання  в Local Storage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}


loadTodos();

// Отримуємо елементи з DOM
const form = document.getElementById('todoForm');
const ul = document.getElementById('todoList');
const counterTotal = document.getElementById('counterTotal');
const counterUnchecked = document.getElementById('counterUnchecked');

// Нова справа
function newTodo(todoText) {
    todos.push({
        id: Date.now().toString(),
        text: todoText,
        completed: false
    });
    saveTodos(); // Сохранить
}

function renderTodo(todo) {
    const checked = todo.completed ? 'checked' : '';
    return `
        <li>
            <input type="checkbox" ${checked} data-id="${todo.id}">
            <label>${todo.text}</label>
            <button data-id="${todo.id}">Delete</button>
        </li>
    `;
}

function render(todos) {
    const html = todos.map(todo => renderTodo(todo)).join('');
    ul.innerHTML = html;
    updateCounter();
}

// Оновлення лічильників
function updateCounter() {
    const total = todos.length;
    const unchecked = todos.filter(todo => !todo.completed).length;
    counterTotal.textContent = total;
    counterUnchecked.textContent = unchecked;
}

// Видалення
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos(); // Збереження даних після видалення справи
    render(todos);
}

// Перевірка
function checkTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    todo.completed = !todo.completed;
    saveTodos(); // Збереження даних після зміни статусу справи
    render(todos);
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const todoText = form.todoInput.value.trim();
    if (todoText !== '') {
        newTodo(todoText);
        form.reset();
        render(todos);
    }
});

ul.addEventListener('click', e => {
    if (e.target.matches('button')) {
        const id = e.target.dataset.id;
        deleteTodo(id);
    } else if (e.target.matches('input[type="checkbox"]')) {
        const id = e.target.dataset.id;
        checkTodo(id);
    }
});

render(todos);
