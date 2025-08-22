// 공통 유틸리티 함수들
function showLoading(element) {
    element.innerHtml = `
        <div class="loading">
            <div class="spinner"></div>
            데이터를 불러오는 중...
        </div>
    `;
}

function showError(element, message) {
    element.innerHTML = `
        <div class="error">
            <strong>오류 발생:</strong> ${message}
        </div>
    `;
}

function showSuccess(element, message) {
    element.innerHTML = `
        <div class="success">
            ${message}
        </div>
    `;
}

// 기본 fetch - 여러 사용자 데이터
document.getElementById('fetchUsersBtn').addEventListener('click', async function () {
    const resultDiv = document.getElementById('usersResult');
    const button = this;

    try {
        // 버튼 비활성화 및 로딩 표시
        button.disabled = true;
        showLoading(resultDiv);

        // API 호출
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        // 응답 상태 확인
        if (!response.ok) {
            throw new Error(`HTTP 오류! 상태: ${response.status}`);
        }

        const users = await response.json();

        // 검색 HTML 생성
        let html = '<div class="success">사용자 목록을 성공적으로 불러왔습니다.</div>'

        users.slice(0, 5).forEach(user => { // 처음 5명만 표시
            html += `
                <div class="user-card">
                    <div class="user-name">${user.name}</div>
                    <div class="user-email">📧 ${user.email}</div>
                    <div class="user-details">
                        🏠 ${user.address.city} | 
                        🏢 ${user.company.name} | 
                        📱 ${user.phone}
                    </div>
                </div>
            `;
        });

        resultDiv.innerHTML = html;
    } catch (error) {
        showError(resultDiv, error.message);
    } finally {
        // 버튼 다시 활성화
        button.disabled = false;
    }
});

// 2. 매개변수가 있는 fetch - 특정 사용자
document.getElementById('fetchUserBtn').addEventListener('click', async function () {
    const userId = document.getElementById('userSelect').value;
    const resultDiv = document.getElementById('userResult');
    const button = this;

    if (!userId) {
        showError(resultDiv, '사용자를 선택해주세요');
        return;
    }

    try {
        button.disabled = true;
        showLoading(resultDiv);

        // 사용자 정보와 게시물을 동시에 가져오기
        const [userResponse, postsResponse] = await Promise.all([
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        ]);

        if (!userResponse.ok || !postsResponse.ok) {
            throw new Error('데이터를 가져오는데 실패했습니다.');
        }

        const user = await userResponse.json();
        const posts = await postsResponse.json();

        let html = `
            <div class="success">
                ${user.name}님의 정보를 불러왔습니다! (게시물 ${posts.length}개)
            </div>
            <div class="user-card">
                <div class="user-name">${user.name} (${user.username})</div>
                <div class="user-email">📧 ${user.email}</div>
                <div class="user-details">
                    🏠 ${user.address.city}, ${user.address.street}<br>
                    🏢 ${user.company.name} - ${user.company.catchPhrase}<br>
                    📱 ${user.phone} | 🌐 ${user.website}
                </div>
            </div>
            <h4>최근 게시물:</h4>
        `;

        // 최근 게시물 3개만 표시
        posts.slice(0, 3).forEach(post => {
            html += `
                <div class="post-item">
                    <div class="post-title">${post.title}</div>
                    <div class="post-body">${post.body}</div>
                </div>
            `;
        });

        resultDiv.innerHTML = html;
    } catch (error) {
        showError(resultDiv, error.message);
    } finally {
        button.disabled = false;
    }
});

// 3. 에러 처리 예시
document.getElementById('fetchPostsBtn').addEventListener('click', async function () {
    const resultDiv = document.getElementById('postsResult');
    const button = this;

    try {
        button.disabled = true;
        showLoading(resultDiv);
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        
        if (!response.ok) {
            throw new Error(`서버 오류: ${response.status}`);
        }
        
        const posts = await response.json();
        
        let html = '<div class="success">게시물을 성공적으로 불러왔습니다!</div>';
        
        posts.slice(0, 10).forEach(post => {  // 처음 10개만 표시
            html += `
                <div class="post-item">
                    <div class="post-title">게시물 ${post.id}: ${post.title}</div>
                    <div class="post-body">${post.body}</div>
                </div>
            `;
        });
        
        resultDiv.innerHTML = html;
        
    } catch (error) {
        showError(resultDiv, `게시물을 불러오는데 실패했습니다: ${error.message}`);
    } finally {
        button.disabled = false;
    }
});
// 에러 테스트 버튼
document.getElementById('fetchErrorBtn').addEventListener('click', async function() {
    const resultDiv = document.getElementById('postsResult');
    const button = this;
    
    try {
        button.disabled = true;
        showLoading(resultDiv);
        
        // 의도적으로 잘못된 URL 사용
        const response = await fetch('https://jsonplaceholder.typicode.com/invalid-endpoint');
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
    } catch (error) {
        if (error.name === 'TypeError') {
            showError(resultDiv, '네트워크 연결을 확인해주세요. 인터넷 연결이 불안정할 수 있습니다.');
        } else {
            showError(resultDiv, `요청 실패: ${error.message}`);
        }
    } finally {
        button.disabled = false;
    }
});