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
// 아이템 추가
function addItem() {
    const input = document.getElementById('itemInput');
    const container = document.getElementById('itemContainer');

    let itemName
    if (input.value.trim() === '') { //만약 아무것도 안 적었으면 아이템~로 자동 이름 붙이기
        itemName = `아이템 ${++itemCount}`;
    } else {//있다면 그 글자 그대로 아이템 이름으로 사용
        itemName = input.value.trim();
        itemCount++;//itemCount는 추가된 아이템 개수를 세는 변수
    }

    // 첫 번째 아이템이면 안내 메시지 제거
    if (itemCount === 1) {
        container.innerHTML = '';
    }

    // 새로운 아이템 생성
    const newItem = document.createElement('div');
    newItem.className = 'new-item';
    newItem.innerHTML = `
    <span>${itemName}</span>
    <button class="btn btn-danger" style="padding: 5px 10px; font-size: 12px;" onclick="removeItem(this)">삭제</button>`;

    container.appendChild(newItem);
    input.value = '';

    showSuccess('step5', `"${itemName}"를 추가했습니다!`);
}

// 랜덤 아이템
function addRandomItem() {
    const randomItems = ['🍎 사과', '🍌 바나나', '🍕 피자', '🎂 케이크', '☕ 커피', '🍔 햄버거', '🍦 아이스크림', '🍿 팝콘'];
    const randomItem = randomItems[Math.floor(Math.random() * randomItems.length)]; //Math.random(); 0~1사이 랜덤 숫자, Math.floor(); 소수점 버리기, 리스트 길이를 곱해서 랜덤 위치의 음식 선택

    document.getElementById('itemInput').value = randomItem;
    addItem();
}

// 컬러 아이템
function addColorfulItem() {
    const input = document.getElementById('itemInput');
    const container = document.getElementById('itemContainer');

    let itemName;
    if (input.value.trin() === '') {
        itemName = `컬러 아이템 ${++itemCount}`;
    } else {
        itemName = input.value.trim();
        itemCount++;
    }

    // 첫 번째 아이템이면 안내 메시지 제거
    if (itemCount === 1) {
        container.innerHTML = '';
    }

    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#6c5ce7', '#fd79a8'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // 새로운 컬러풀 아이템 생성
    const newItem = document.createElement('div');
    newItem.className = 'new-item';
    newItem.style.backgroundColor = randomColor;
    newItem.style.color = 'white';
    newItem.style.borderColor = randomColor;
    newItem.innerHTML = `
        <span>${itemName}</span>
        <button class="btn btn-danger" style="padding: 5px 10px; font-size: 12px;" onclick="removeItem(this)">삭제</button>
    `;
    
    container.appendChild(newItem);
    input.value = '';

    showSuccess('step5', `컬러풀한 "${itemName}"를 추가했습니다!`);
}

// 삭제
function removeItem(button) {
    const item = button.parentElement;
    const itemName = item.querySelector('span').textContent;
    item.remove();
    
    // 모든 아이템이 삭제되면 안내 메시지 다시 표시
    const container = document.getElementById('itemContainer');
    if (container.children.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #64748b; margin: 0;">버튼을 눌러서 아이템을 추가해보세요!</p>';
        itemCount = 0;
    }
    
    showSuccess('step5', `"${itemName}"를 삭제했습니다!`);
}

// 전체 삭제
function clearAllItems() {
    const container = document.getElementById('itemContainer');
    container.innerHTML = '<p style="text-align: center; color: #64748b; margin: 0;">버튼을 눌러서 아이템을 추가해보세요!</p>';
    itemCount = 0;
    showSuccess('step5', '모든 아이템을 삭제했습니다!');
}

// Enter 키 이벤트 처리 : 사용자가 입력창에 글을 쓰고 Enter 키만 눌러도 버튼 클릭 없이 바로 실행되게 함
document.getElementById('userInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        displayInput();
    }
});

document.getElementById('itemInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addItem();
    }
});

// 페이지 로드 시 안내
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 각 단계별 버튼 연습 페이지가 준비되었습니다!');
    console.log('💡 각 단계의 버튼들을 차례대로 눌러보세요!');
    console.log('💡 F12를 눌러서 콘솔에서 실행 로그를 확인할 수 있습니다.');
});