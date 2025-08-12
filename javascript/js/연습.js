let isOnline = false;

//1. DOM 조작
const userCard = document.getElementById('userCard');
const userName = document.getElementById('userName');
const userStatus = document.getElementById('userStatus');

// 상태 토글
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

// 프리미엄 전환
function makePremium() {
    userCard.classList.add('premium');
    userName.textContent += ('⭐');
}

// 초기화
function resetCard() {
    userStatus.textContent = '오프라인';
    userStatus.className = 'status offline';
    userCard.className = 'user-card';
    userName.textContent = '김개발';
    isOnline = false;
}

// 2. 동적 콘텐츠 생성
let userCount = 0;

function addUser() {
    const nameInput = document.getElementById('newUserName');
    const roleInput = document.getElementById('newUserRole');
    const userList = document.getElementById('userList');
    const name = nameInput.value.trim();
    const role = roleInput.value.trim();

    if (!name || !role) {
        alert('input에 내용을 입력해주세요');
        return;
    }

    const newUserCard = document.createElement('div');
    newUserCard.className = 'user-card fade-in';
    newUserCard.innerHTML = `
                <h3 id="userName">${name}</h3>
                <p>${role}</p>
                <span id="userStatus" class="status offline">오프라인</span>
                <button onclick="removeUser(this)" class="danger" style="margin-top: 10px;">삭제</button>
    `;

    userList.appendChild(newUserCard);

    nameInput.value = '';
    roleInput.value = '';

    userCount++;
    console.log(`총 사용자 수 : ${userCount}`);
}