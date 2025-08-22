/*---------------------------------------------
	#전체 상품 데이터
---------------------------------------------*/
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
    console.log('전체 상품 보기');
    updateCurrentProducts(products); //currentProducts 업데이트
    currentPage = 1; // 첫 페이지로 리셋
    renderProductsWithPagination(products);
}

// ✅ Step 8: 모든 상품 카드를 map으로 만들기
function renderProducts(productsToRender) {
    //renderProducts 함수를 renderProductsWithPagination으로 교체
    renderProductsWithPagination(productsToRender);
}

/*---------------------------------------------
	#필터 함수
---------------------------------------------*/
function showInStock() {
    console.log('재고 있는 상품만 보기');
    // 핵심 : filter를 사용해서 stock > 0인 상품만 추출
    const inStockProducts = products.filter(product => product.stock > 0); // 재고가 0보다 큰 상품만 통과
    updateCurrentProducts(inStockProducts); // currentProducts 업데이트
    currentPage = 1; // 첫 페이지로 리셋
    renderProductsWithPagination(inStockProducts);
}

function showOnSale() {
    console.log('할인 상품만 보기');
    // 핵심: discount가 0보다 큰 상품만 필터링
    const saleProducts = products.filter(product => product.discount > 0);
    updateCurrentProducts(saleProducts); // currentProducts 업데이트
    currentPage = 1; // 첫 페이지로 리셋
    renderProductsWithPagination(saleProducts);
}

function filterByCategory() {
    console.log('카테고리 필터링');
    const selectedCategory = document.getElementById('categoryFilter').value;

    // 빈 값이면 전체 상품 보여주기
    if (selectedCategory === '') {
        updateCurrentProducts(products);
        currentPage = 1;
        renderProductsWithPagination(products);
        return;
    }

    // 핵심: 선택된 카테고리와 일치하는 상품만 필터링
    const filteredProducts = products.filter(products => products.category === selectedCategory);
    updateCurrentProducts(filteredProducts); // currentProducts 업데이트
    currentPage = 1;
    renderProductsWithPagination(filteredProducts);
}

function filterByPrice() {
    console.log('가격 필터링');
    const maxPrice = parseInt(document.getElementById('maxPrice').value);

    // 입력값이 없거나 유효하지 않으면 전체 상품 보여주기
    if (isNaN(maxPrice) || maxPrice <= 0) {
        renderProducts(products);
        currentPage = 1;
        renderProductsWithPagination(products);
        return;
    }

    // 핵심: 최대 가격 이하인 상품만 필터링
    const filteredProducts = products.filter(product => product.price <= maxPrice);
    updateCurrentProducts(filteredProducts); // currentProducts 업데이트
    currentPage = 1;
    renderProductsWithPagination(filteredProducts);
}

// 복합 필터링 함수 추가
function applyAllFilters() {
    console.log('복합 필터링 적용');

    // 현재 설정된 모든 필터 조건 가져오기
    const selectedCategory = document.getElementById('categoryFilter').value;
    const maxPrice = parseInt(document.getElementById('maxPrice').value);

    console.log('필터 조건:', { selectedCategory, maxPrice });

    // 핵심: 여러 조건을 동시에 체크하는 필터링
    const filteredProducts = products.filter(product => {
        // 조건1: 카테고리 체크
        const categoryMatch = selectedCategory === '' || product.category === selectedCategory;
        // 조건2: 가격 체크
        const priceMatch = isNaN(maxPrice) || maxPrice <= 0 || product.price <= maxPrice;
        
        // 핵심: 모든 조건이 참이어야 통과
        return categoryMatch && priceMatch;
    });

    console.log('복합 조건에 맞는 상품:', filteredProducts);

    renderProducts(filteredProducts);
}
// 필터 초기화 함수 추가
function resetFilters() {
    console.log('필터 초기화');

    // 모든 입력값 초기화
    document.getElementById('categoryFilter').value = '';
    document.getElementById('maxPrice').value = '';

    // 전체 상품 다시 표시
    showAllProducts();
}

/*---------------------------------------------
	#검색 기능
---------------------------------------------*/
// 검색 기능 구현
function searchProducts() {
    console.log('상품 검색');
    const serachTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    // 검색어가 비어있으면 전체 상품 표시
    if (serachTerm === '') {
        updateCurrentProducts(products);
        currentPage = 1;
        renderProductsWithPagination(products);
        return;
    }

    // 핵심: 상품명에 검색어가 표함된 상품 찾기
    const searchResults = products.filter(product => {
        const productName = product.name.toLowerCase();// 대소문자 구분 없이 검색
        const productCategory = product.category.toLowerCase();
        return productName.includes(serachTerm) || productCategory.includes(searchTerm);// includes()로 부분 일치 검색
    });

    updateCurrentProducts(searchResults); // currentProducts 업데이트
    currentPage = 1;
    renderProductsWithPagination(searchResults);
}
// 고급 검색(상품명+카테고리)
function advancedSearch() {
    console.log('고급 검색');

    const serachTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    if (serachTerm === '') {
        renderProducts(products);
        return;
    }

    // 핵심: 상품명 또는 카테고리에서 검색어 찾기
    const searchResults = products.filter(product => {
        const productName = product.name.toLowerCase();
        const productCategory = product.category.toLowerCase();

        // 상품명 또는 카테고리에 검색어가 포함되면 결과에 포함
        return productName.includes(serachTerm) || productCategory.includes(serachTerm);
    });

    console.log('고급 검색 결과:', searchResults);
    renderProducts(searchResults);
}
// 정렬 기능 구현
let currentProducts = [...products]; //원본 배열 복사
function sortProducts() {
    console.log('상품 정렬');

    // 핵심: select에서 정렬 기준 가져오기
    const sortBy = sortSelect.value;

    console.log('정렬 기준:', sortBy);

    // 현재 표시중인 상품들을 복사해서 정렬
    let sortedProducts = [...currentProducts];

    // 핵심: 정렬 기준에 따라 다른 정렬 로직 적용
    switch (sortBy) {
        case 'name-asc':
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name)); //이름 오름차순
            break;
        case 'name-desc':
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name)); //이름 내림차순
            break;
        case 'price-asc':
            sortedProducts.sort((a, b) => a.price - b.price); //가격 오름차순
            break;
        case 'price-desc':
            sortedProducts.sort((a, b) => b.price - a.price); //가격 내림차순
            break;
        case 'stock-asc':
            sortedProducts.sort((a, b) => a.stock - b.stock); //재고 오름차순
            break;
        case 'stock-desc':
            sortedProducts.sort((a, b) => b.stock - a.stock); //재고 내림차순
            break;
        default:
            // 기본값: 원본 순서 유지
            break;
    }
    console.log('정렬 결과:', sortedProducts);

    // 정렬은 currentPage 리셋하지 않음 (현재 페이지 유지)
    renderProductsWithPagination(sortedProducts);
}
// currentProducts 업데이트하는 헬퍼 함수들
function updateCurrentProducts(newProducts) {
    currentProducts = [...newProducts];
    console.log('현재 상품 목록 업데이트:', currentProducts.length, '개');
}

/*---------------------------------------------
	#페이지네이션과 고급 기능
---------------------------------------------*/
// 페이지네이션 전역 변수들
let currentPage = 1;
let itemsPerPage = 4; // 페이지당 상품 수
let totalPages = 1;

// 핵심: 페이지네이션이 적용된 렌더링 함수
function renderProductsWithPagination(productsToRender) {
    console.log('페이지네이션 렌더링:', productsToRender.length, '개 상품');

    // 전체 페이지 수 계산
    totalPages = Math.ceil(productsToRender.length / itemsPerPage);

    // 현재 페이지가 전체 페이지 수를 넘으면 첫 페이지로
    if (currentPage > totalPages) {
        currentPage = 1;
    }

    // 핵심: 현재 페이지에 표시할 상품들만 추출
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const updateCurrentProducts = productsToRender.slice(startIndex, endIndex);

    console.log(`페이지 ${currentPage}/${totalPages}: ${startIndex}~${endIndex - 1} 인덱스`);

    // 상품 카드 렌더링(기존 로직 재사용)
    renderProductCards(updateCurrentProducts);

    // 페이지네이션 컨트롤 렌더링
    renderPaginationControls();

    // 상품 개수 정보 표시
    renderProductCount(productsToRender.length, startIndex + 1, Math.min(endIndex, productsToRender.length));
}
// 상품 카드만 렌더링하는 분리된 함수
function renderProductCards(productsToRender) {
    const productGrid = document.getElementById('productGrid');

    if (productsToRender.length === 0) {
        productGrid.innerHTML = `<p style="text-align:center; color:#7f8c8d;">조건에 맞는 상품이 없습니다.</p>`;
        return;
    }

    const productCards = productsToRender.map(product => {
        const stockStatus = product.stock > 0 ? 'in-stock' : 'out-of-stock';
        const stockText = product.stock > 0 ? `재고: ${product.stock}개` : '품절';

        // 할인가격 계산
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

        return `
            <div class="product-card">
                <div class="category-tag">${product.category}</div>
                <h3>${product.name}</h3>
                ${priceHTML}
                <div class="stock ${stockStatus}">${stockText}</div>
                <div class="product-actions" style="margin-top: 10px;">
                    <button onclick="toggleFavorite(${product.id})" 
                            style="background: #f39c12; padding: 6px 12px; font-size: 12px;">
                        ⭐ 즐겨찾기
                    </button>
                </div>
            </div>
        `;
    }).join('');

    productGrid.innerHTML = productCards;
}

// 페이지네이션 컨트롤 UI
function renderPaginationControls() {
    const paginationDiv = document.getElementById('pagination');

    if (totalPages <= 1) {
        paginationDiv.innerHTML = '';
        return;
    }

    let paginationHTML = `< class="pagination-controls" style="display:felx; justify-content: center; align-items: center; gap: 10px; margin: 20px 0;">`;

    // 이전 페이지 버튼
    paginationHTML += `
        <button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''} style="padding:8px 12px; ${currentPage === 1 ? 'opacity:0.5;' : ''}">◀ 이전</button>
    `;

    // 페이지 번호 버튼들
    for (let page = 1; page <= totalPages; page++) {
        const isCurrentPage = page === currentPage;
        paginationHTML += `
            <button onclick="goToPage(${page})" 
                    style="padding: 8px 12px; ${isCurrentPage ? 'background: #3498db; color: white;' : 'background: #ecf0f1;'}">
                ${page}
            </button>
        `;
    }

    // 다음 페이지 버튼
    paginationHTML += `
        <button onclick="goToPage(${currentPage + 1})" 
                ${currentPage === totalPages ? 'disabled' : ''} 
                style="padding: 8px 12px; ${currentPage === totalPages ? 'opacity: 0.5;' : ''}">
            다음 ▶
        </button>
    `;

    paginationHTML += '</div>';

    paginationDiv.innerHTML = paginationHTML;
}

// 페이지 이동 함수
function goToPage(pageNumber) {
    console.log('페이지 이동:', pageNumber);

    // 유효한 페이지 번호인지 확인
    if (pageNumber < 1 || pageNumber > totalPages) {
        console.log(['유효하지 않은 페이지 번호']);
        return;
    }

    currentPage = pageNumber;
    console.log('현재 페이지:', currentPage);

    // 현재 필터링된 상품들로 다시 렌더링
    renderProductsWithPagination(currentProducts);
}

// 상품 개수 정보 표시
function renderProductCount(totalCount, startItem, endItem) {
    const countDiv = document.getElementById('productCount');

    const countHTML = `
        <div style="text-align:center;margin:10px 0;color:#7f8c8d;font-size:14px;">전체 ${totalCount}개 상품 중 ${startItem}-${endItem}번째 표시(페이지 ${currentPage}/${totalPages})</div>
    `;

    countDiv.innerHTML = countHTML;
}

// 페이지당 상품 수 변경
function changeItemsPerPage() {
    const select = document.getElementById('itemsPerPageSelect');
    itemsPerPage = parseInt(select.value);
    currentPage = 1; //첫 페이지로 리셋

    console.log('페이지당 상품 수 변경:', itemsPerPage);

    // 현재 상품들로 다시 렌더링
    renderProductsWithPagination(currentProducts);
}

// 즐겨찾기 시스템 구현
let favoriteProducts = [];

// 핵심: 즐겨찾기 토글 함수
function toggleFavorite(productId) {
    console.log('즐겨찾기 토글:', productId);

    const isFavorite = favoriteProducts.includes(productId);

    if (isFavorite) {
        // 이미 즐겨찾기에 있으면 제거
        favoriteProducts = favoriteProducts.filter(id => id !== productId);
        console.log('즐겨찾기에서 제거:', productId);
    } else {
        // 즐겨찾기에 없으면 추가
        favoriteProducts.push(productId);
        console.log('즐겨찾기에 추가:', productId);
    }

    console.log('현재 즐겨찾기 목록:', favoriteProducts);

    // UI 업데이트
    updateFavoriteButtons();
    updateFavoriteCount();
}
// 즐겨찾기 버튼 UI 업데이트
function updateFavoriteButtons() {
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const button = card.querySelector('button[onclick*="toggleFavorite"]');
        if (button) {
            const productId = parseInt(button.getAttribute('onclick').match(/\d+/)[0]);
            const isFavorite = favoriteProducts.includes(productId);

            if (isFavorite) {
                button.style.background = '#e74c3c';
                button.innerHTML = '❤️ 즐겨찾기 해제';
            } else {
                button.style.background = '#f39c12';
                button.innerHTML = '⭐ 즐겨찾기';
            }
        }
    });
}
// 즐겨찾기 개수 표시 업데이트
function updateFavoriteCount() {
    const countSpan = document.getElementById('favoriteCount');
    if (countSpan) {
        countSpan.textContent = favoriteProducts.length;
    }
}
// 즐겨찾기 상품만 보기
function showFavoriteProducts() {
    console.log('즐겨찾기 상품만 보기');

    if (favoriteProducts.length === 0) {
        alert('즐겨찾기한 상품이 없습니다');
        return;
    }

    // 즐겨찾기 ID에 해당하는 상품들 필터링
    const favoriteItems = products.filter(product => favoriteProducts.includes(product.id));
    console.log('즐겨찾기 상품들:', favoriteItems);
    
    updateCurrentProducts(favoriteItems);
    currentPage = 1; // 첫 페이지로 리셋
    renderProductsWithPagination(favoriteItems);
}
// 즐겨찾기 전체 삭제
function clearAllFavorites() {
    if (favoriteProducts.length === 0) {
        alert('즐겨찾기가 비었습니다');
        return;
    }

    const confirmed = confirm('모든 즐겨찾기를 삭제하시겠습니까?');
    if (confirmed) {
        favoriteProducts = [];
        console.log('모든 즐겨찾기 삭제');

        updateFavoriteButtons();
        updateFavoriteCount();

        alert('즐겨찾기가 모두 삭제되었습니다!');
    }
}

// 페이지 로드 시 실행
window.onload = function() {
    showAllProducts();
};