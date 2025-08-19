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

// FILTER 예제들
// 짝수만 필터링
function filterExample1() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const evenNumbers = numbers.filter(num => num % 2 === 0);

    document.getElementById('filterResult1').innerHTML = `
        <p><strong>원본:</strong> [${numbers.join(', ')}]</p>
        <p><strong>짝수만:</strong> [${evenNumbers.join(', ')}]</p>
        <p><strong>코드:</strong> numbers.filter(num => num % 2 === 0)</p>
    `;
}
// 성인 사용자만 필터링
function filterExample2() {
    const users = [
        { name: '김철수', age: 17 },
        { name: '이영희', age: 25 },
        { name: '박민수', age: 16 },
        { name: '최지은', age: 30 }
    ];

    const adults = users.filter(user => users.age >= 18);

    document.getElementById('filterResult2').innerHTML = `
                <p><strong>전체 사용자:</strong> ${users.map(u => `${u.name}(${u.age})`).join(', ')}</p>
                <p><strong>성인만:</strong> ${adults.map(u => `${u.name}(${u.age})`).join(', ')}</p>
            `;
}
// 재고 있는 상품만 필터링
function filterExample3() {
    const products = [
        { name: '노트북', stock: 5 },
        { name: '마우스', stock: 0 },
        { name: '키보드', stock: 3 },
        { name: '모니터', stock: 0 }
    ];

    const inStock = products.filter(product => product.stock > 0);

    document.getElementById('filterResult3').innerHTML = `
                <p><strong>재고 있는 상품:</strong> ${inStock.map(p => `${p.name}(${p.stock}개)`).join(', ')}</p>
            `;
}

// REDUCE 예제들
// 배열 합계 구하기
function reduceExample1() {
    const numbers = [1, 2, 3, 4, 5];

    // reduce로 합계 구하기
    const sum = numbers.reduce((accumulator, current) => accumulator + current, 0);

    document.getElementById('reduceResult1').innerHTML = `
                <p><strong>배열:</strong> [${numbers.join(', ')}]</p>
                <p><strong>합계:</strong> ${sum}</p>
                <p><strong>코드:</strong> numbers.reduce((acc, cur) => acc + cur, 0)</p>
            `;
}
// 장바구니 총액 계산
function reduceExample2() {
    const cart = [
        { name: '노트북', price: 1000000, quantity: 1 },
        { name: '마우스', price: 30000, quantity: 2 },
        { name: '키보드', price: 80000, quantity: 1 }
    ];

    const totalAmount = cart.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);

    document.getElementById('reduceResult2').innerHTML = `
                <p><strong>장바구니:</strong></p>
                ${cart.map(item => `<p>- ${item.name}: ${item.price.toLocaleString()}원 × ${item.quantity}개</p>`).join('')}
                <p><strong>총액:</strong> ${totalAmount.toLocaleString()}원</p>
            `;
}
// 카테고리별 상품 그룹핑
function reduceExample3() {
    const products = [
        { name: '맥북', category: '노트북' },
        { name: '아이폰', category: '스마트폰' },
        { name: '갤럭시', category: '스마트폰' },
        { name: '서피스', category: '노트북' }
    ];

    // 카테고리별로 그룹핑
    const groupedByCategory = products.reduce((groups, product) => {
        const category = product.category;
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(product.name);
        return groups;
    }, {});

    const resultHTML = Object.entries(groupedByCategory)
                .map(([category, items]) => `<p><strong>${category}:</strong> ${items.join(', ')}</p>`)
                .join('');

    document.getElementById('reduceResult3').innerHTML = resultHTML;
}