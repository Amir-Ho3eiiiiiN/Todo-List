let filterValue = "All";
let add=0;

const TodoList = document.querySelector(".todo_app_list");
const selectFilter = [...document.querySelectorAll(".valueCompleted")];
let todoAddbtn="";
let todoInput ="";

document.addEventListener("DOMContentLoaded", (e) => {
    filterTodos();
  });

selectFilter.forEach(span=>{
  span.addEventListener("click",(e)=>{
    filterValue= e.target.dataset.value;
    filterTodos();
  })
})

function getAllTodos(){
    const todos =  JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
}

function saveAllTodos(todos){
    localStorage.setItem("todos",JSON.stringify(todos));
    filterTodos();
}


function createTodos(todos){
    let Todos= ``;
    todos.forEach(todo => {
        Todos += `<div class="todo_option">
        <h3>${todo.title}</h3>
        <p>${new Date(todo.createAt).toLocaleDateString("en-us")}</p>
        <div class="todo_control">
          <span class="todo__remove far fa-trash-alt" data-todo-id=${todo.id}></span>
          <span class="todo__check  far fa-check-square" data-todo-id=${todo.id}></span>
        </div>
      </div>`
    });
    TodoList.innerHTML=Todos + ` <div class="todo_option">
    <input type="text" id="option_input" class="todo_option_input" />
    <div class="todo_button_add todo_button_add_first">
      <span>+</span>
    </div>
  </div>`;

    todoAddbtn = document.querySelector(".todo_button_add");
    todoInput = document.getElementById("option_input");
    todoAddbtn.addEventListener("click",()=>{
      if(add==0){
       inputShow();
      }else{
      addNewTodo();
      }
    });

    const removeBtns = [...document.querySelectorAll(".todo__remove")];
    removeBtns.forEach((btn)=> btn.addEventListener("click",removeTodo));

    const checkBtns = [...document.querySelectorAll(".todo__check")];
    checkBtns.forEach((btn)=> btn.addEventListener("click",checkTodo));
}

function addNewTodo(){

    inputHide();
    if(!todoInput.value) return null;
    const newTodo={
     id: Date.now(),
     createAt: new Date().toISOString(),
     title: todoInput.value,
     isCompleted: false,
    };
    todoInput.value="";
    savedTodo(newTodo);
}

function savedTodo(newTodo){
    const todos = getAllTodos();
    todos.push(newTodo);
    saveAllTodos(todos);
}

function removeTodo(e){
    let todos = getAllTodos();
    const todoId = Number(e.target.dataset.todoId);
    todos = todos.filter((t)=>t.id !== todoId);
    saveAllTodos(todos);
}

function checkTodo(e){
    const todos = getAllTodos();
    const todoId = Number(e.target.dataset.todoId);
    const selectTodos = todos.find((t)=>t.id===todoId);
    selectTodos.isCompleted = !selectTodos.isCompleted;
    saveAllTodos(todos);
}



function filterTodos(){
    const todos = getAllTodos();
    switch (filterValue) {
      case "all": {
        createTodos(todos);
        break;
      }
      case "completed": {
        const filteredTodos = todos.filter((t) => t.isCompleted);
        createTodos(filteredTodos);
        break;
      }
      case "uncompleted": {
        const filteredTodos = todos.filter((t) => !t.isCompleted);
        createTodos(filteredTodos);
        break;
      }
      default:
        createTodos(todos);
    }
}

function inputShow(){
  console.log("b");
    todoAddbtn.classList.remove("todo_button_add_first");
    todoAddbtn.classList.add("todo_button_add_second");
    todoInput.style.display = "block"; 
    add=1;
}

function inputHide(){
  console.log("a");
        todoAddbtn.classList.remove("todo_button_add_second");
        todoAddbtn.classList.add("todo_button_add_first");
        todoInput.style.display = "none"; 
        add=0;
}
