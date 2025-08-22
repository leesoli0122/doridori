// 1. 기본 클릭 이벤트
const basicBtn = document.getElementById('basicBtn');
const basicResult = document.getElementById('basicResult');

basicBtn.addEventListener('click', function () {
    clickCount++;
    basicResult.textContent = `버튼을 ${clickCount}번 클릭했습니다`;

    // 클릭할 때마다 색상 변경
    basicResult.style.color = clickCount % 2 === 0 ? '#007bff' : '#28a745';
})