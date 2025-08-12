// 전역 변수
//step1. 상태 변수 선언. 온라인/오프라인 상태를 저장하기 위한 불린 값 초기화.
let isOnline = false;
// step6-5. 사용자 수
let userCount = 0;
// step7-1. 클릭 횟수
let clickCount = 0;

// 1. Dom 선택과 스타일 조작
// step2. Dom 요소 선택. HTML에서 ID로 요소 찾아 변수에 저장
const userCard = document.getElementById('userCard');
const userName = document.getElementById('userName');
const userStatus = document.getElementById('userStatus');

// step3. 상태 토글. isOnline 값을 반전시키고, 상태 텍스트,클래스,스타일을 변경
function toggleUserStatus() {
    isOnline = !isOnline;

    if (isOnline) {
        userStatus.textContent = '온라인';
        userStatus.className = 'status online';
        userCard.classList.add('active');
    } else {
        userStatus.textContent = '오프라인';
        userStatus.className = 'status offline';
        userCard.classList.remove('active');
    }
}
// step4. 프리미엄 전환. 카드에 premium 클래스를 추가하고 이름 뒤에 ⭐를 붙임
function makePremium() {
    userCard.classList.add('premium');
    userName.textContent += '⭐';

}
// step5. 초기화. 클래스,텍스트,상태를 원래대로 되돌리고 isOnline을 false로 초기화
function resetCard() {
    userCard.className = 'user-card';
    userName.textContent = '김개발';
    userStatus.textContent = '오프라인';
    userStatus.className = 'status offline';
    isOnline = false;
}

// 2. 동적 콘텐츠 생성
// step6. 사용자 추가
function addUser() {
    // step6-1. 입력값 가져오기. HTML에서 이름과 직무 입력 필드를 가져오고 값 앞뒤 공백을 제거
    const nameInput = document.getElementById('newUserName');
    const roleInput = document.getElementById('newUserRole');
    const userList = document.getElementById('userList');
    const name = nameInput.value.trim();
    const role = roleInput.value.trim();

    // step6-2. 유효성 검사. 둘 중 하나라도 비어 있으면 경고창 후 함수 종료.
    if (!name || !role) {
        alert('이름과 직무를 모두 입력해주세요');
        return;
    }

    // step6-3. 사용자 카드 요소 생성. 이름, 직무, 상태(온라인), 삭제 버튼이 포함된 카드 구조를 동적으로 생성
    const newUserCard = document.createElement('div');
    newUserCard.className = 'user-card fade-in';
    newUserCard.innerHTML = `
                <h3 id="userName">${name}</h3>
                <p>${role}</p>
                <span id="userStatus" class="status offline">오프라인</span>
                <button onclick="removeUser(this)" class="danger" style="margin-top: 10px;">삭제</button>`;
    
    // step6-4. 사용자 목록에 추가
    userList.appendChild(newUserCard);

    // step6-5. 입력창 초기화 & 사용자 수 증가
    nameInput.value =  '';
    roleInput.value = '';
    
    userCount++;
    console.log(`총 사용자 수 : ${userCount}`);
}
// step6-6. 개별 사용자 삭제 기능. 삭제 버튼 클릭 시 해당 버튼의 부모 요소를 찾아 제거. 사용자 수 감수
function removeUser(button) {
    const userCard = button.parentElement;
    userCard.remove();
    userCount--;
    console.log(`총 사용자 수: ${userCount}`);
}

// step6-7. 전체 삭제. 사용자 목록 전체를 비움
function clearAllUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    userCount = 0;
    console.log('모든 사용자가 삭제되었습니다.');
}

// 3. 이벤트 처리와 데이터 조작
// step7. 클릭 수 증가. 클릭 횟수를 1증가시키고, HTML의 #count 요소에 표시.
function incrementCounter() {
    clickCount++;
    document.getElementById('count').textContent = clickCount;

    // step.7-1. 5번 클릭마다 메시지 표시
    if (clickCount % 5 === 0) {
        alert('${clickCount}번 클릭하셨소');
    }
}

// step8. 리렛. 클릭 횟수를 0으로 되돌리고 화면 표시도 초기화
function resetCounter() {
    clickCount = 0;
    document.getElementById('count').textContent = clickCount;
}

// step9. 페이지 로드 시 초기 설정. HTML이 모두 로드되었을 때 실행되는 초기화 코드
document.addEventListener('DOMCountentLoaded', function () {
    console.log('DOM 조작 실습 페이지가 로드되었습니다.');
})

// step10. 실무에서 자주 쓰는 US 패턴 - 버튼 클릭 시 로딩 효과. 모든 버튼에 클릭 시 투명도 변화
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function () {
        this.style.opacity = '0.7';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 150);
    });
});

// step11. 키보드 이벤트 처리. Enter 키를 눌렀을 때, 현재 커서가 이름 또는 직무 입력창이면 addUser()실행
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;
        if (activeElement.id === 'newUserName' || activeElement.id === 'newUserRole') {
            addUser();
        }
    }
})