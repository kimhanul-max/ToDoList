// code.js

const TodoInput = document.querySelector(".todo-input");
const deadline = document.querySelector(".deadline");
const submit = document.querySelector(".submit");
const body = document.querySelector("body");
const todos = document.querySelector(".todos");

function updateRemainingTime(countdown, selectedDate) {
    const currentTime = new Date();
    const timeDifference = selectedDate.getTime() - currentTime.getTime();

    if (timeDifference > 0) {
        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
        let minutes = Math.ceil((timeDifference / (1000 * 60)) % 60);

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        countdown.innerHTML = `남은 시간: ${days}일 ${hours}시간 ${minutes}분`;
    } else {
        countdown.innerHTML = '마감되었습니다.'; // 시간이 지났을 때 표시할 내용
    }
}

function createTodo() {
    var btn = document.createElement("input");
    var todo = document.createElement("div");
    var TodoForm = document.createElement("div");
    var countdown = document.createElement("div"); // 추가: 남은 시간을 표시할 요소
    todo.innerText = TodoInput.value;
    btn.type = "checkbox";
    todo.classList.add("todo");
    btn.classList.add("btn");
    TodoForm.classList.add("TodoForm");
    btn.addEventListener("click", removeTodo);
    if (TodoInput.value != "") {
        todos.appendChild(TodoForm);
        TodoForm.appendChild(btn);
        TodoForm.appendChild(todo);
        TodoForm.appendChild(countdown); // 추가: 남은 시간을 표시할 요소를 할 일 요소에 추가
    }
    if (deadline.value !== "") {
        const selectedDate = new Date(deadline.value);
        const currentTime = new Date();
        const timeDifference = selectedDate.getTime() - currentTime.getTime();

        if (timeDifference > 0) {
            let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // 남은 일수 계산
            let hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24); // 남은 시간 계산
            let minutes = Math.ceil((timeDifference / (1000 * 60)) % 60); // 남은 분 계산

            // 추가: 분이 60분일 경우 시간으로 반올림
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }

            // 추가: 남은 시간을 표시
            countdown.innerHTML = `남은 시간: ${days}일 ${hours}시간 ${minutes}분`;

            // 추가: 남은 시간을 업데이트하기 위해 setInterval 사용
            const updateInterval = setInterval(function() {
                updateRemainingTime(countdown, selectedDate);
            }, 60000); // 1분(60초)마다 업데이트

            // 추가: 할 일이 삭제되면 업데이트 Interval도 제거
            btn.addEventListener("click", function() {
                clearInterval(updateInterval);
                removeTodo.call(this);
            });

            setTimeout(function() {
                var msg = todos.firstChild.children[1].innerText;
                var bell = new Audio('./bell.mp3');
                bell.play();
                var dialog = document.createElement("dialog");
                var form = document.createElement("form");
                var closeBtn = document.createElement("button");
                dialog.classList.add("dialog");
                form.classList.add("form");
                closeBtn.classList.add("closeBtn");
                dialog.innerText = msg;
                closeBtn.innerText = "X";
                body.appendChild(dialog);
                dialog.appendChild(form);
                form.appendChild(closeBtn);
                dialog.showModal();
                btn.click();
            }, timeDifference);

            // 추가: 1분마다 남은 시간을 업데이트
            setInterval(function() {
                updateRemainingTime(countdown, selectedDate);
            }, 60000);
        }
    }
}

function removeTodo() {
    const elem = this.parentElement;
    setTimeout(function() {
        elem.remove();
    }, 300);
}

TodoInput.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        createTodo();
    }
});

submit.addEventListener("click", createTodo);
