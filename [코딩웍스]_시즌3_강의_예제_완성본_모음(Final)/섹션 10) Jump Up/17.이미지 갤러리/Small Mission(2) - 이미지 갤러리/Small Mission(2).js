$(function(){
  // 이미지 컨텐츠 개수
  let totalNum = $('.content div').length
  let currentNum = 1
  
  // 페이지 번호 텍스트 넣기
  $('.page-num span:first').text(currentNum)
  $('.page-num span:last').text(totalNum)
  
  // 다음 버튼을 누를 경우
  $('.next').click(function(){
    currentNum++
    if(currentNum > totalNum) {
      currentNum = 1
    }
    // A.append(B)       B를 A 안쪽 뒤에 추가 → B.appendTo(A)
    // A.insertAfter(B)  A를 B 뒤에 추가 
    // A.after(B)        B를 A 바깥 뒤에 추가  
    $('.content div:first').appendTo('.content')
    $('.page-num span:first').text(currentNum)
  })

  // 이전 버튼을 누를 경우
  $('.prev').click(function(){
    currentNum--
    if(currentNum < 1) {
      currentNum = totalNum
    }
    // A.prepend(B)       B를 A 안쪽 앞에 추가 → B.prependTo(A)
    // A.insertBefore(B)  A를 B 앞에 추가 
    // A.before(B)        B를 A 바깥 앞에 추가
    $('.content div:last').prependTo('.content')
    $('.page-num span:first').text(currentNum)
  })
})