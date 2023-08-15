const form = document.querySelector('.form')
const list = document.querySelector('.list')
const input = document.querySelector('.input-task')
let id = 0;

const todoArray = [];

form.addEventListener('submit', (e) => {
  e.preventDefault();
  id++;
  const todoItem = new Todo(id, input.value)
  todoArray.push(todoItem)
  console.log(todoArray)
  renderTask(todoItem)
  clearInput()
});

class Todo {
  constructor(id, task){
    this.id = id;
    this.task = task;
  }
}


//display the data

function renderTask(todoItem){
    const todo = document.createElement("div")
    const task = document.createElement("p");
    task.innerText = todoItem.task;
    todo.appendChild(task);

    const deleteSpan = document.createElement("span");
    deleteSpan.classList.add("delete")
    deleteSpan.innerText = "x"
    todo.appendChild(deleteSpan)
    todo.classList.add("todo-item")
    list.appendChild(todo)

}


function clearInput(){
  input.value = ""
}

function removeItem(){
  list.addEventListener("click", (e)=> {
    if(e.target.classList.contains("delete")){

      e.target.parentElement.remove()
      console.log("removed")
    }
  })
}

removeItem()