$(document).ready(function(){
    // HTML 요소를 선택합니다.
    const menuButton = document.querySelector('.menu');
    const sidebar = document.querySelector('.l-sidebar');
    
    // 메뉴 버튼 클릭 시 이벤트 핸들러를 추가합니다.
    menuButton.addEventListener('click', () => {
        // .l-sidebar에 'on' 클래스를 토글합니다.
        sidebar.classList.toggle('on');
    });
    
    // .l-sidebar의 각 li 요소를 클릭 시 이벤트 핸들러를 추가합니다.
    $('.l-sidebar ul > li').click(function(e){
        e.stopPropagation();
        $(this).addClass('on').siblings().removeClass('on');
    });
    
    //tab
    $(".tab-item > li").click(function() {
        var tabCont = $(this).attr("data-tab"); // 선택한 탭의 'data-tab' 속성 값을 가져옵니다.
        $(".tab-item > li").removeClass("on"); // 모든 탭에서 'on' 클래스를 제거합니다.
        $(this).addClass("on"); // 선택한 탭에 'on' 클래스를 추가합니다.
        $(".tab-content").addClass("dp-none"); // 모든 탭 컨텐츠를 숨깁니다.
        $("#" + tabCont).removeClass("dp-none"); // 선택한 탭의 컨텐츠만 보여줍니다.
      });
})