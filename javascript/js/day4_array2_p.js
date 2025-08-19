// ✅ Step 6: 전체 상품 데이터
let products = [
    { id: 1, name: '맥북 프로', category: '전자제품', price: 2500000, stock: 5, discount: 0 },
    { id: 2, name: '아이폰 15', category: '전자제품', price: 1200000, stock: 0, discount: 0.05 },
    { id: 3, name: '나이키 운동화', category: '의류', price: 150000, stock: 12, discount: 0.2 },
    { id: 4, name: '자바스크립트 완벽가이드', category: '도서', price: 45000, stock: 8, discount: 0 },
    { id: 5, name: '에어팟 프로', category: '전자제품', price: 350000, stock: 3, discount: 0.1 },
    { id: 6, name: '청바지', category: '의류', price: 80000, stock: 0, discount: 0.15 },
    { id: 7, name: '사무용 의자', category: '가구', price: 200000, stock: 6, discount: 0 },
    { id: 8, name: 'React 마스터북', category: '도서', price: 38000, stock: 15, discount: 0.1 }
];

// ✅ Step 7: 가장 기본적인 함수부터 만들어보세요
function showAllProducts() {
    renderProducts(products);
}

// ✅ Step 8: 모든 상품 카드를 map으로 만들기
function renderProducts(productsToRender) {
    const productGrid = document.getElementById('productGrid');
    
    // 상품이 없으면 "조건에 맞는 상품이 없습니다" 메시지 표시
    if (productsToRender.length === 0) {
        productGrid.innerHTML = '<p style="text-align: center; color: #7f8c8d;">조건에 맞는 상품이 없습니다.</p>';
        return;
    }
    
    // 핵심: map을 사용해서 모든 상품을 HTML로 변환
    const productCards = productsToRender.map(product => {
        const stockStatus = product.stock > 0 ? 'in-stock' : 'out-of-stock';
        const stockText = product.stock > 0 ? `재고: ${product.stock}개` : '품절';
        
        // 새로운 기능: 할인가격 계산
        let priceHTML = '';
        if (product.discount > 0) {
            const originalPrice = product.price;
            const discountedPrice = Math.floor(originalPrice * (1 - product.discount));
            const discountPercent = Math.floor(product.discount * 100);

            priceHTML = `
                <div class="price">
                    <span style="text-decoration: line-through; color: #95a5a6; font-size: 14px;">
                        ${originalPrice.toLocaleString()}원
                    </span>
                    <br>
                    <span style="color: #e74c3c; font-size: 18px; font-weight: bold;">
                        ${discountedPrice.toLocaleString()}원
                    </span>
                    <span style="background: #e74c3c; color: white; padding: 2px 6px; border-radius: 4px; font-size: 12px; margin-left: 8px;">
                        ${discountPercent}% 할인
                    </span>
                </div>
            `;
        } else {
            priceHTML = `<div class="price">${product.price.toLocaleString()}원</div>`;
        }

        // 각 상품마다 HTML 카드를 만들어서 반환
        return `
            <div class="product-card">
                <div class="category-tag">${product.category}</div>
                <h3>${product.name}</h3>
                ${pri}
                <div class="stock ${stockStatus}">${stockText}</div>
            </div>
        `;
    }).join(''); // 배열을 하나의 문자열로 합치기
    
    // 완성된 HTML을 화면에 표시
    productGrid.innerHTML = productCards;
}

// ✅ Step 9: 나머지 필터 함수들은 비워둡니다 (나중에 구현)
function showInStock() {
    // 핵심 : filter를 사용해서 stock > 0인 상품만 추출
    const inStockProducts = products.filter(product => {
        return product.stock > 0; // 재고가 0보다 큰 상품만 통과
    });

    console.log('재고 있는 상품:', inStockProducts);

    // 필터링된 상품들을 화면에 표시
    renderProducts(inStockProducts);
}

function showOnSale() {
    // 핵심: discount가 0보다 큰 상품만 필터링
    const saleProducts = products.filter(product => {
        return product.discount > 0;
    });

    console.log('할인 중인 상품:', saleProducts);

    // 필터링된 상품들을 화면에 표시
    renderProducts(saleProducts);
}

function filterByCategory() {
    console.log('카테고리 필터링');
    // TODO: 선택된 카테고리로 필터링하기
}

function filterByPrice() {
    console.log('가격 필터링');
    // TODO: 최대 가격으로 필터링하기
}

// 페이지 로드 시 실행
window.onload = function() {
    showAllProducts();
};