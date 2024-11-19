$(function(){
  $('.buttons button').click(function(){
    // 버튼에 클래스 추가제거
    $(this).addClass('active').siblings().removeClass('active')
    // 탭 변경
    let tabAttr = $(this).attr('data-alt')
    $('.tab-content').removeClass('active')
    $('.' + tabAttr).addClass('active')
  })

})