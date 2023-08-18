const form = document.querySelector('.form')
const list = document.querySelector('.list-container')
const input = document.querySelector('.input-task')
const completed = document.querySelector(".completed-tasks")
const btn = document.querySelector(".form_button")
const completedSeparator = document.querySelector(".visible")

let id = 0;
const todoArray = []

form.addEventListener('submit', (e) => {
  e.preventDefault()
  const todoItem = new Todo(id, input.value)
  id++
  todoArray.push(todoItem)
  console.log(todoItem.id)
  renderTask(todoItem)
  clearInput()
})

class Todo {
  constructor (id, task) {
    this.id = id
    this.task = task
  }
}

// display the data

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
      todoArray.splice((e.target.previousElementSibling.id),1)
      e.target.parentElement.remove()
      console.log('removed')
    }
  })
  completed.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
      todoArray.splice((e.target.previousElementSibling.id),1)
      e.target.parentElement.remove()
      console.log('removed')
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

removeItem()
checkItem ()
checkItemCompleted()
