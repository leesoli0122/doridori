// 1단계: Product 생성자 함수
// 상품을 만드는 폼
// new 바인딩 활용
function Product(name, price, category) {
    this.name = name; //상품가격
    this.price = price; //가격
    this.category = category; //카테고리
    this.createdAt = new Date(); //생성 날짜

    // 상품 정보를 보여주는 메서드
    this.getInfo = function () {
        return `${this.name} (${this.category}) - ${this.price}원`;
    }
}

function testStep1() {
    // new를 사용해서 새 상품 만들기
    const laptop = new Product('노트북', 1200000, '전자제품');
    const book = new Product('책', 35000, '도서');

    document.getElementById('result1').innerHTML = `<div class="success">상품 생성 성공!</div>
    상품1: ${laptop.getInfo()}<br>
    상품2: ${book.getInfo()}<br>
    <em>this를 사용해서 각 상품이 자신의 정보를 기억한다.</em>`
}

// 2단계: ProductManager 객체
// 상품들을 관리하는 매니저
// 암시적 바인딩 활용
const productManager = {
    products: [], //상품들을 담을 배열(빈상자)

    //나중에 여기에 기능들을 추가할 예정
    init: function () {
        return `상품 관리자가 준비되었습니다. 현재 상품 수: ${this.products.length}개`;
    }
};

function testStep2() {
    const message = productManager.init();

    document.getElementById('result2').innerHTML = `<div class="success">관리자 생성 성공</div>
    ${message}<br>
    <em>this.products로 자신의 상품 배열에 접근</em>`
}

// 3단계: 상품 추가 기능
// productManager에 addProduct 메서드 추가
productManager.addProduct = function (product) {
    this.products.push(product); //상품 배열에 추가
    return `&{product.name}이(가) 추가되었습니다. 총 상품 수: ${this.products.length}개`;
}

function testStep3() {
    //새 상품들 만들기
    const smartphone = new Product('스마트폰', 800000, '전자제품');
    const novel = new Product('소설책', 15000, '도서');
    
    // 상품 관리자에 추가하기
    const result1 = productManager.addProduct(smartphone);
    const result2 = productManager.addProduct(novel);
    
    document.getElementById('result3').innerHTML = `
        <div class="success">✅ 상품 추가 성공!</div>
        ${result1}<br>
        ${result2}<br>
        <em>함수 선언식으로 만든 메서드가 this로 객체에 접근</em>
    `;
}

// 4단계: 상품 찾기 기능(함수 표현식 사용)
productManager.findProduct = function (name) {
    // find 메서드로 조건에 맞는 상품 찾기
    const found = this.products.find(product => product.name === name);

    if (found) {
        return `찾았습니다: ${found.getInfo()}`;
    } else {
        return `'${name}' 상품을 찾을 수 없습니다.`;
    }
};

function testStep4() {
    const result1 = productManager.findProduct('스마트폰');
    const result2 = productManager.findProduct('없는상품');

    document.getElementById('result4').innerHTML = `<div class="success">상품 찾기 성공</div>
    ${result1}<br>
    ${result2}<br>
    <em>find 메서드와 화살표 함수를 조합해서 검색</em>`
}

// 5단계: 할인 적용 가능(화살표 함수의 특별함 보여주기)
productManager.applyDiscountWrong = (discountRate) => { //왜 화살표 함수가 안 되는 지 보여주려고 만든 함수일 뿐
    // ❌ 화살표 함수에서는 this가 productManager를 가리키지 않음
    return `할인 적용 실패: this. products는 ${typeof this.products}입니다.`;
}

productManager.applyDiscount = function (discountRate) {
    // 일반 함수로 수정: this가 제대로 productManager를 가리킴
    const discountedProducts = this.products.map(product => { //map: 모든 상품에 할인을 적용하려고
        // 여기서는 화살표 함수 사용 OK(this가 필요 없음)
        const discountedPrice = Math.floor(product.price * (1 - discountRate)); //math.floor: 할인된 가격을 정수로 만들려고
        return `${product.name}: ${product.price}원 -> ${discountedPrice}원`;
    });
    return discountedProducts;
}

function testStep5() {
    const wrongResult = productManager.applyDiscountWrong(0.1);
    const correctResult = productManager.applyDiscount(0.1);

    document.getElementById('result5').innerHTML = `<div class="success">할인 적용 완료</div>
    <strong>화살표 함수로 했을 때 (잘못된 예):</strong><br>
    ${wrongResult}<br><br>
    <strong>일반 함수로 했을 때 (올바른 예):</strong><br>
    ${correctResult.join('<br>')}<br>
    <em>객체 메서드에서는 일반 함수를, 배열 메서드 콜백에서는 화살표 함수를</em>`
}

// 전체 테스트
function testAll() {
    // 처음부터 다시 해보기
    const testManager = {
        products: [],

        addProduct: function (product) {
            this.products.push(product);
            return `${product.name} 추가됨`;
        },

        findProduct: function (name) {
            const found = this.products.find(product => product.name === name);
            return found ? found.getInfo() : '못 찾음';
        },

        applyDiscount: function (rate) {
            return this.products.map(p => ({
                name: p.name,
                originalPrice: p.price,
                discountedPrice: Math.floor(p.price * (1 - rate))
            }));
        }
        // 간단한 버전 (이렇게 해도 됨)
        // applyDiscount: function(discountRate) {
        //     return this.products.map(product => {
        //     const newPrice = product.price * (1 - discountRate);
        //     return product.name + ': ' + newPrice + '원';
        //     });
        // }
    };

    // 테스트 실행
    const product1 = new Product('테스트 상품1', 10000, '테스트');
    const product2 = new Product('테스트 상품2', 20000, '테스트');

    testManager.addProduct(product1);
    testManager.addProduct(product2);

    const found = testManager.findProduct('테스트 상품1');
    const discounted = testManager.applyDiscount(0.2);

    document.getElementById('resultAll').innerHTML = `
        <div class="success">🎉 전체 시스템 작동 완료!</div>
        <strong>상품 관리 시스템 테스트 결과:</strong><br>
        • 상품 생성: ✅<br>
        • 상품 추가: ✅<br>
        • 상품 검색: ${found}<br>
        • 할인 적용: ${discounted.map(p => `${p.name} ${p.originalPrice}원→${p.discountedPrice}원`).join(', ')}<br>
        <em>💡 모든 기능이 정상 작동합니다!</em>
    `;
}