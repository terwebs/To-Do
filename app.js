const form = document.querySelector('.form')
const list = document.querySelector('.list-container')
const input = document.querySelector('.input-task')
const completed = document.querySelector(".completed-tasks")
const btn = document.querySelector(".form_button")
const completedSeparator = document.querySelector(".hidden")

let id = 1;
let todoArray = []

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const todoItem = new Todo(id, input.value)
  id++
  todoArray.push(todoItem)
  renderTask(todoItem)
  saveLocal()
  clearInput()
})

class Todo {
  constructor (id, task) {
    this.id = id
    this.task = task
  }
}

function renderTask (todoItem) {
  const todo = document.createElement('div')
  const task = document.createElement('p')
  const checkComplete = document.createElement("input")
  checkComplete.type = "checkbox"
  checkComplete.classList.add("todo-item_done")

  todo.appendChild(checkComplete)
  task.innerText = todoItem.task
  task.id = todoItem.id
  task.classList.add("todo-content")
  todo.appendChild(task)

  const deleteSpan = document.createElement('span')
  deleteSpan.classList.add('delete')
  deleteSpan.innerText = 'x'
  todo.appendChild(deleteSpan)
  todo.classList.add('todo-item')
  list.appendChild(todo)
}

function clearInput () {
  input.value = ''
}

function removeItem () {
  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      //iterate trough todo array
      for (let i=0; i<todoArray.length; i++){
        // console.log(`${i} = ${todoArray[i].id}`)
        // console.log(`id = ${e.target.previousElementSibling.id}`)
        // check if element id = Todo.id
        if (todoArray[i].id === parseInt(e.target.previousElementSibling.id)){
          todoArray.splice(i,1)
          e.target.parentElement.remove()
          checkCompleteditems()
          saveLocal()
        }
      }
    }
  })
  completed.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      console.log("responding to click")
      console.log(e.target.previousElementSibling.id)
      //iterate trough todo array
      for (let i=0; i<todoArray.length; i++){
        // console.log(`${i} = ${todoArray[i].id}`)
        // console.log(`id = ${e.target.previousElementSibling.id}`)
        // check if element id = Todo.id
        if (todoArray[i].id === parseInt(e.target.previousElementSibling.id)){
          todoArray.splice(i,1)
          e.target.parentElement.remove()
          checkCompleteditems()
          saveLocal()
        }
      }
    }
  })
}


function checkItem () {
  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo-item_done')) {
      if (e.target.nextElementSibling.classList.contains("checked")){
        e.target.nextElementSibling.classList.remove("checked")
        console.log(e.target.parentElement)
      } else {
        e.target.nextElementSibling.classList.add("checked")
        completed.appendChild(e.target.parentElement)
        checkCompleteditems()
      }
    }
  })
}


function checkItemCompleted () {
  completed.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo-item_done')) {
      if (e.target.nextElementSibling.classList.contains("checked")){
        e.target.nextElementSibling.classList.remove("checked")
        list.appendChild(e.target.parentElement)
        checkCompleteditems()
      } else {
        e.target.nextElementSibling.classList.add("checked")
      }
    }
  })
}

function checkCompleteditems() {
  if(completed.childElementCount > 1 ){
    completed.classList.add("show-completed")
    completedSeparator.classList.replace("hidden","visible")
  } else {
    completed.classList.remove("show-completed")
    completedSeparator.classList.replace("visible","hidden")
  }
}

function showSample(){
  for(todo of todoArray){
    renderTask(todo)
  }
}

removeItem()
checkItem ()
checkItemCompleted()
getLocal()
showSample()

function saveLocal(){
    localStorage.setItem('todo', JSON.stringify(todoArray))
}

function getLocal(){

  if( JSON.parse(localStorage.getItem("todo")) !== null){
    let newArray = JSON.parse(localStorage.getItem("todo"))
    for (todo of newArray){
      const todoItem = new Todo(todo.id, todo.task)
      todoArray.push(todoItem)
    }
  } else {
    todoArray.push(new Todo(0, 'I am a sample task, click the checkbox to complete and the "x" to delete'))
  }
}

