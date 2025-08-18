// step1 기본 배열 조작
function step1() {
    const output = document.getElementById('output1');
    let result = '';

    // 메뉴 이름들을 배열로 관리
    const menuNames = ['홈', '서비스', '포트폴리오'];
    result += `초기 메뉴: ${JSON.stringify(menuNames)}\n`;

    // 메뉴 추가
    menuNames.push('연락처');
    result += `'연락처' 추가 후: ${JSON.stringify(menuNames)}\n`;

    // 메뉴 찾기
    const serviceIndex = menuNames.indexOf('서비스');
    result += `'서비스' 메뉴 위치: ${serviceIndex}번 인덱스\n`;

    // 메뉴 존재 확인
    const hasAbout = menuNames.includes('회사소개');
    result += `'회사소개' 메뉴 있나요? ${hasAbout ? '있음' : '없음'}\n`;

    result += `\n 배열 기본 조작 완료`;

    output.textContent = result;
}