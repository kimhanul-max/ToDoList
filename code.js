//code.js
const TodoInput = document.querySelector(".todo-input");
const min = document.querySelector(".min");
const hour = document.querySelector(".hour");
const submit = document.querySelector(".submit");
const body = document.querySelector("body");
const todos = document.querySelector(".todos");
const btn = document.querySelectorAll(".btn");

function createTodo() {
    var btn = document.createElement("input");
    var todo = document.createElement("div");
    var TodoForm= document.createElement("div");
    todo.innerText = TodoInput.value;
    btn.innerText = "X";
    btn.type = "checkbox";
    todo.classList.add("todo");
    btn.classList.add("btn");
    TodoForm.classList.add("TodoForm");
    btn.addEventListener("click", removeTodo);
    if (TodoInput.value != "") {
        todos.appendChild(TodoForm);
        TodoForm.appendChild(btn);
        TodoForm.appendChild(todo);
    }
    if (!(hour.value == "" && min.value == "")) {
        setTimeout(function() {
            var bell = new Audio('./bell.mp3');
            bell.play();
            var dialog = document.createElement("dialog");
            var form = document.createElement("form");
            var closeBtn = document.createElement("button");
            dialog.classList.add("dialog");
            form.classList.add("form");
            closeBtn.classList.add("closeBtn");
            dialog.innerText = TodoInput.value;
            closeBtn.innerText = "close";
            body.appendChild(dialog);
            dialog.appendChild(form);
            form.appendChild(closeBtn);
            dialog.showModal();
            btn.click();
          }, Number(hour.value) * 3600000 + Number(min.value) * 60000);      
    }
}

function removeTodo(event) {
    setTimeout(function() {
        const elem = event.target.parentElement;
        elem.remove();
      }, 300);
}
TodoInput.addEventListener("keydown", function(event) {
    // Check if the pressed key is Enter (keyCode 13)
    if (event.keyCode === 13) {
      event.preventDefault(); // Prevent the default Enter key behavior (form submission)

      // Call the createTodo function
      createTodo();
    }
  });
submit.addEventListener("click", createTodo);