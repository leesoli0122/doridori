// 전역 변수
//step1. 상태 변수 선언. 온라인/오프라인 상태를 저장하기 위한 불린 값 초기화.
let isOnline = false;

// 1. Dom 선택과 스타일 조작
// step2. Dom 요소 선택. HTML에서 ID로 요소 찾아 변수에 저장
const userCard = document.getElementById('userCard');
const userNam = document.getElementById('userName');
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

}
// step5. 초기화. 클래스,텍스트,상태를 원래대로 되돌리고 isOnline을 false로 초기화
function resetCard() {

}