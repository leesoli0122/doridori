/* 요소 가져오기 */
// '.player' 클래스를 가진 요소를 선택하고 변수에 저장
const player = document.querySelector('.player');
// '.player' 내에서 '.viewer' 클래스를 가진 비디오 요소를 선택하고 변수에 저장
const video = player.querySelector('.viewer');
// '.player' 내에서 '.progress' 클래스를 가진 요소를 선택하고 변수에 저장 (진행 바 컨테이너)
const progress = player.querySelector('.progress');
// '.player' 내에서 '.progress_filled' 클래스를 가진 요소를 선택하고 변수에 저장 (진행 바)
const progressBar = player.querySelector('.progress_filled');
// '.player' 내에서 '.toggle' 클래스를 가진 재생/일시정지 버튼을 선택하고 변수에 저장
const toggle = player.querySelector('.toggle');
// '[data-skip]' 속성을 가진 모든 버튼 요소를 선택하고 변수에 저장 (앞으로/뒤로 이동 버튼들)
const skipButtons = player.querySelector('[data-skip]');
// '.player_slider' 클래스를 가진 모든 슬라이더 요소를 선택하고 변수에 저장 (볼륨, 재생 속도 조절)
const ranges = player.querySelector('.player_slider');

/* Build out functions */
// 비디오의 재생 또는 일시정지를 토글하는 함수
function togglePlay(){
    // 비디오가 일시정지 상태면 'play', 재생 중이면 'pause' 메서드를 선택
    const method = video.paused ? 'play' : 'pause';
    // 선택된 메서드를 비디오에 적용
    video[method]();
}

// 재생/일시정지 버튼의 아이콘을 업데이트하는 함수
function updateButton() {
    // 비디오가 일시정지 상태면 '►', 재생 중이면 '❚ ❚' 아이콘을 선택
    const icon = this.paused ? '►' : '❚ ❚';
    console.log(icon);
    // 토글 버튼의 텍스트를 해당 아이콘으로 업데이트
    toggle.textContent = icon;
}

// 비디오의 현재 시간을 데이터 속성에 따라 건너뛰는 함수
function skip() {
    // 클릭된 버튼의 'data-skip' 값을 현재 재생 시간에 더해 비디오 재생 위치를 변경
    video.currentTime += parseFloat(this.dataset.skip);
}

// 슬라이더를 움직일 때 볼륨이나 재생 속도를 조절하는 함수
function handleRangeUpdate() {
    // 슬라이더의 'name' 속성에 따라 비디오의 해당 속성(볼륨, 재생 속도)를 슬라이더의 값으로 설정
    video[this.name] = this.value;
}

// 비디오 재생 시 진행 바를 업데이트하는 함수
function handleProgress() {
    // 현재 재생 시간과 전체 시간의 비율을 계산하여 퍼센트로 반환
    const percent = (video.currentTime / video.duration) * 100;
    // 계산된 퍼센트를 사용해 진행 바의 길이를 설정
    progressBar.style.flexBasis = ``
}

// 진행 바를 클릭하거나 드래그할 때 재생 위치를 변경하는 함수
function scrub(e) {
    // 클릭한 위치(e.offsetX)를 진행 바 전체 너비로 나누어 비디오의 총 시간에 곱해 새 재생 시간을 계산
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    // 계산된 재생 시간을 비디오의 현재 시간으로 설정
    video.currentTime = scrubTime;
}

/* Hook up the event listeners */
// 비디오를 클릭하면 재생/일시정지를 토글
video.addEventListener('click', togglePlay);
// 비디오가 재생되면 버튼 아이콘을 업데이트
video.addEventListener('click', updateButton);
// 비디오가 일시정지되면 버튼 아이콘을 업데이트
video.addEventListener('pause', updateButton);
// 비디오의 재생 시간 업데이트 시 진행 바를 업데이트
video.addEventListener('timeupdate', handleProgress);

// 토글 버튼을 클릭하면 재생/일시정지를 토글
toggle.addEventListener('click', togglePlay);
// 스킵 버튼을 클릭하면 해당 시간만큼 비디오를 건너뜀
skipButtons.forEach(button => button.addEventListener('click', skip));
// 슬라이더가 변경될 때(마우스로 드래그하거나 변경할 때) 볼륨/재생 속도를 조절
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
// 마우스가 슬라이더 위를 움직일 때도 볼륨/재생 속도를 조절
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

// 마우스 버튼 상태를 저장하는 변수
let mousedown = false;
// 진행 바를 클릭하면 해당 위치로 비디오 재생 시간을 변경
progress.addEventListener('click', scrub);
// 마우스를 움직일 때 마우스 버튼이 눌린 상태면 진행 바에서 드래그하여 재생 시간을 변경
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
// 마우스 버튼이 눌렸을 때 드래그 상태로 전환
progress.addEventListener('mousedown', () => mousedown = true);
// 마우스 버튼을 놓으면 드래그 상태 종료
progress.addEventListener('mouseup', () => mousedown = false);