$(function(){
  $('.buttons button').click(function(){
    // 버튼 클래스 제어하기
    $(this).addClass('active').siblings().removeClass('active')
    // 속성 설정하기(setter)
    let imageSrc = $(this).attr('data-image')
    $('.image img').attr('src', imageSrc)
  })

})