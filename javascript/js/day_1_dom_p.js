// 전역 변수들
let counter = 0;
let itemCount = 0;

// 성공 메시지 표시 함수
function showSuccess(stepId, message) {
    const step = document.getElementById(stepId);
    step.classList.add('completed');
    
    // 기존 성공 메시지 제거
    const oldMessage = step.querySelector('.success-message');
    if (oldMessage) {
        oldMessage.remove();
    }
    
    // 새로운 성공 메시지 추가
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = '✅ ' + message;
    step.appendChild(successDiv);
    
    console.log('성공: ' + message);
}

// 1단계
function changeText(newText) {
    document.getElementById('textBox').textContent = newText;
    // 성공 메시지
    showSuccess('step1', `텍스트를 "${newText}"로 변경했습니다!`);
}

function resetText() {
    document.getElementById('textBox').textContent = '원래 텍스트';
    showSuccess('step1', '텍스트를 초기화했습니다!');
}

// 2단계
function changeBackgroundColor(color) {
    const box = document.getElementById('colorBox');
    box.style.backgroundColor = color;
    box.style.border = '2px solid' + color;
    showSuccess('step2', `배경색을 ${color}로 변경했습니다!`);
}

function resetColor() {
    const box = document.getElementById('colorBox');
    box.style.backgroundColor = '#f8fafc';
    box.style.border = '2px solid #e2e8f0';
    showSuccess('step2', '색상을 초기화했습니다!');
}

// 3단계
// 그대로 표시
function displayInput() {
    const input = document.getElementById('userInput');
    const display = document.getElementById('displayBox');

    if (input.value.trim() === '') { //만약 인풋에 아무 값이 없다면 알럿을 띄워주세요
        alert('메시지를 입력해주세요');
        return;
    }

    display.textContent = input.value;
    showSuccess('step3', '입력값을 그대로 표시했습니다');
}
// 인사와 함께
function displayWithGreeting() {
    const input = document.getElementById('userInput');
    const display = document.getElementById('displayBox');

    if (input.value.trim() === '') { //만약 인풋에 아무 값이 없다면 알럿을 띄워주세요
        alert('메시지를 입력해주세요');
        return;
    }

    display.textContent = `안녕하세요 "${input.value}"라고 하셨군요`;
    showSuccess('step3', '인사말과 함께 표시했습니다');
}
// 대문자로
function displayUppercase() {
    const input = document.getElementById('userInput');
    const display = document.getElementById('displayBox');

    if (input.value.trim() === '') {
        alert('메시지를 입력해주세요');
        return;
    }

    display.textContent = input.value.toUpperCase();
    showSuccess('step3', '대문자로 표시했습니다');
}
// 글자 수 세기
function displayLength() {
    const input = document.getElementById('userInput');
    const display = document.getElementById('displayBox');

    if (input.value.trim() === '') {
        alert('메시지를 입력해주세요');
        return;
    }

    display.textContent = `"${input.value}"는 총 "${input.value.length}"글자 입니다`;
    showSuccess('step3', '글자 수를 계산해서 표시했습니다');
}
// 입력창 지우기
function clearInput() {
    document.getElementById('userInput').value = '';
    document.getElementById('displayBox').textContent = '입력한 내용이 여기에 표시됩니다';
    showSuccess('step3', '입력창을 지웠습니다!');
}

// 4단계
function increment(amount = 1) {
    counter += amount;
    document.getElementById('counter').textContent = counter;
    showSuccess('step4', `카운터를 +${counter} 증가시켰습니다.(현재 ${counter})`);
}
function decrement(amount = 1) {
    counter -= amount;
    document.getElementById('counter').textContent = counter;
    showSuccess('step4', `카운터를 -${counter} 감소시켰습니다.(현재 ${counter})`);
}
function resetCounter() {
    counter = 0;
    document.getElementById('counter').textContent = counter;
    showSuccess('step4', '카운터를 0으로 초기화했습니다');
}

// 5단계
function addItem() {
    const input = document.getElementById('itemInput');
    const container = document.getElementById('itemContainer');

    let itemName
    if (input.value.trim() === '') {
        itemName = `아이템 ${++itemCount}`;
    } else {
        itemName = input.value.trim();
        itemCount++;
    }
}