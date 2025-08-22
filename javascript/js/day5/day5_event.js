// 1. 기본 클릭 이벤트
const basicBtn = document.getElementById('basicBtn');
const basicResult = document.getElementById('basicResult');
let clickCount = 0;

basicBtn.addEventListener('click', function () {
    clickCount++;
    basicResult.textContent = `버튼을 ${clickCount}번 클릭했습니다`;

    // 클릭할 때마다 색상 변경
    basicResult.style.color = clickCount % 2 === 0 ? '#007bff' : '#28a745';
});

// 2. 실시간 입력 감지
const nameInput = document.getElementById('nameInput');
const inputResult = document.getElementById('inputResult');

nameInput.addEventListener('input', function (event) {
    const inputValue = event.target.value;

    if (inputValue.trim() === '') {
        inputResult.textContent = '입력한 내용이 실시간으로 표시됩니다.';
        inputResult.style.color = '#6c757d';
    } else {
        inputResult.textContent = `안녕하세요. ${inputValue}님 맞으신가요?`;
        inputResult.style.color = '#28a745';
    }
});
// enter 키 감지
nameInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        alert(`${event.target.value}님, 환영합니다.`);
    }
});

// 3. 실무 패턴: 동적 요소 관리
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');
let todoId = 0;

// 할일 추가 함수
function addTodo() {
    const todoText = todoInput.value.trim();

    if (todoText === '') {
        alert('할일을 입력해주세요');
        return;
    }

    // 새로운 할일 아이템 생성
    const todoItem = document.createElement('div');
    todoItem.className = 'todo-item';
    todoItem.innerHTML = `
        <span>${todoText}</span>
        <button class="delete-btn" onclick="deleteTodo(${todoId})">삭제</button>
    `;
    todoItem.id = `todo-${todoId}`;

    todoList.appendChild(todoItem);
    todoInput.value = ''; // 입력 필드 초기화
    todoId++;
}

// 할일 삭제 함수
function deleteTodo(id) {
    const todoItem = document.getElementById(`todo-${id}`);
    todoItem.remove();
}

// 버튼 클릭으로 추가
addTodoBtn.addEventListener('click', addTodo);

// Enter 키로도 추가 가능
todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});