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

// step2 메뉴 객체 다루기
function step2() {
    const output = document.getElementById('output2');
    let result = '';

    // 메뉴를 객체로 관리(링크 포함)
    const menuItem = {
        name: '서비스',
        url: '/services',
        icon: 'service-icon'
    };

    result += `기본 메뉴 객체:\n${JSON.stringify(menuItem, null, 2)}\n\n`;

    // 속성 추가
    menuItem.isActive = true;
    menuItem.order = 2;
    result += `속성 추가 후:\n${JSON.stringify(menuItem, null, 2)}\n\n`;

    // 동적 접근
    const property = 'name';
    result += `동적 접근 = ${property}: ${menuItem[property]}\n`;

    // 객체 속성 확인
    result += `'description' 속성 있나요? ${'descriotion' in menuItem ? '있음' : '없음'}\n`;

    result += `\n 객체 조작 완료`;

    output.textContent = result;
}

// step3 비구조화 할당
function step3() {
    const output = document.getElementById('output3');
    let result = '';

    // 복잡한 메뉴 데이터
    const navigationDate = {
        header: {
            logo: 'MyCompany',
            menus: ['홈', '서비스', '포트폴리오', '연락처']
        },
        footer: {
            copyright: '2024 MyCompany',
            socialLinks: ['facebook', 'instagram', 'twitter']
        }
    };

    result += `원본 데이터 구조:\n${JSON.stringify(navigationDate, null, 2)}\n\n`;

    // 비구조화 할당으로 깔끔하게 추출
    const {
        header: { logo, menu },
        footer: { copyright, socialLinks }
    } = navigationDate;

    result += `비구조화로 추출한 데이터:\n`;
    result += `- 로고: ${logo}\n`;
    result += `- 메뉴들:${menus.join(', ')}\n`;
    result += `- 저작권: ${copyright}\n`;
    result += `- 소셜링크: ${socialLinks.join(', ')}\n`;

    result += `\n 비구조화 할당 완료`;

    output.textContent = result;
}