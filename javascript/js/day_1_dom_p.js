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