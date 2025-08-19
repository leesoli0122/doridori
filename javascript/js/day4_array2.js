// MAP 예제들
// 숫자 배열 → 제곱 배열
function example1() {
    const numbers = [1, 2, 3, 4, 5];

    // 기존 방식(반복문)
    const oldWay = [];
    for (let i = 0; i < numbers.length; i++) {
        oldWay.push(numbers[i] * numbers[i]);
    }

    console.log(oldWay); //(5) [1, 4, 9, 16, 25]

    // map 방식
    const newWay = numbers.map(num => num * num);
    //console.log(newWay); //(5) [1, 4, 9, 16, 25]

    document.getElementById('result1').innerHTML = `
    <p><strong>원본:</strong>[${numbers.join(', ')}]</p>
    <p><strong>제곱 결과:</strong>[${newWay.join(', ')}]</p>
    <p><strong>코드:</strong>numbers.map(num =>num * num)</p>
    `;
}

// 사용자 데이터 → HTML 카드
function example2() {
    const users = [
        { id: 1, name: '김철수', age: 25, job: '개발자' },
        { id: 2, name: '이영희', age: 30, job: '디자이너' },
        { id: 3, name: '박민수', age: 28, job: '기획자' },
        { id: 4, name: '최민희', age: 33, job: '퍼블리셔' }
    ];

    // 실무에서 자주 쓰는 패턴: 데이터 → HTML
    const userCards = users.map(user => `
        <div class="user-card">
            <h4>${user.name} (${user.age}세)</h4>
            <p>직업: ${user.job}</p>
            <p>ID: ${user.id}</p>
        </div>
    `).join('');

    document.getElementById('result2').innerHTML = `
        <div class="user-list">${userCards}</div>
        <p><strong>핵심:</strong> 배열.map() → HTML 문자열 배열 → join('')</p>
    `;
}

// 상품 데이터 → 할인가 계산
function example3() {
    const products = [
        { name: '노트북', price: 1000000, discount: 0.1 },
        { name: '마우스', price: 30000, discount: 0.05 },
        { name: '키보드', price: 80000, discount: 0.15 }
    ];

    // 할인가 계산된 새 배열 만들기
    const discountedProducts = products.map(product => ({
        ...product, // 기존 속성 복사
        originalPrice: product.price,
        finalPrice: Math.floor(product.price * (1 - product.discount))
    }));

    const resultHTML = discountedProducts.map(product =>
        `<p><strong>${product.name}:</strong> ${product.originalPrice.toLocaleString()}원 -> ${product.finalPrice.toLocaleString()}원</p>`
    ).join('');

    document.getElementById('result3').innerHTML = resultHTML;
}