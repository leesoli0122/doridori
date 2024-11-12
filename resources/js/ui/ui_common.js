$(document).ready(function(){
    // 탭 기능
    $('.tab-item > li').on('click', function () {
        const tabCont = $(this).data('tab'); // 선택한 탭의 'data-tab' 속성 값을 가져옴
        $('.tab-item > li').removeClass('on'); // 모든 탭에서 'on' 클래스 제거
        $(this).addClass('on'); // 선택한 탭에 'on' 클래스 추가
        $('.tab-content').addClass('dp-none'); // 모든 탭 컨텐츠 숨김
        $('#' + tabCont).removeClass('dp-none'); // 선택한 탭의 컨텐츠만 표시
    });
})