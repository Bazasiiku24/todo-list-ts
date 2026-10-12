import "./style.css"

const input = document.querySelector<HTMLInputElement>("#todo-input");
const addBtn = document.querySelector<HTMLButtonElement>("#add-btn");
const list = document.querySelector<HTMLUListElement>("#todo-list");

if (!input || !addBtn || !list) {
    throw new Error("必要な要素が見つかりません");
}

interface Todo{
    text: string;
    completed: boolean;
}

let saved = localStorage.getItem("todos")
let todos: Todo[] = saved ? JSON.parse(saved) : []
// let todos: Todo[] = JSON.parse(localStorage.getItem("todos")) || [];


addBtn.addEventListener("click", ()=>{
    const text = input.value;
    todos.push({text: text, completed: false});
    input.value = "";
    saveTodos();
    render();
})

const render = () =>{
    list.innerHTML = '';

    todos.forEach((todo, index) => {
    const li = document.createElement('li');

    if(todo.completed){
        li.classList.add("completed")
    }

    const span = document.createElement('span');
    span.textContent = todo.text;
    span.classList.add("todo-text");

    span.addEventListener("click", ()=>{
        todo.completed = !todo.completed;
        console.log(todo.completed);
        saveTodos();
        render();
    })

    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = '削除';
    deleteBtn.classList.add("delete-btn")
    deleteBtn.addEventListener('click', () => {
        todos = todos.filter((_, i) => i !== index);
        saveTodos();
        render();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
    });
}

function saveTodos(){
    localStorage.setItem("todos", JSON.stringify(todos));
}

render();