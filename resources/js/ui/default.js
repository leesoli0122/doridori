function filter(){

    var value, name, item, i;

    //대소문자를 구분하지 않고 가져오기 위해 검색한 값을 toUpperCase()로 모두 대문자로 변환해 변수에 담기
    value = document.getElementById("value").value.toUpperCase();

    //목록에 있는 모든 아이템을 getElementsByClassName으로 가져오기
    item = document.getElementsByClassName("item");

    //목록을 for문으로 돌려 i번째 아이템의 자식 요소인 name의 값을 가져온다.
    for(i=0;i<item.length;i++){
        name = item[i].getElementsByClassName("name");//비교를 위해 name의 값도 대문자로 바꿔준 후 .indexOf()로 검색한 값이 있는지 없는지 확인하기. 값이 없을 경우 -1로 반환
        if(name[0].innerHTML.toUpperCase().indexOf(value) > -1){ //값이 -1이 아닐경우 item[i].style.display를 flex로 바꿔 시각화 아닐 경우 none로 설정해 검색 목록에 띄우지 않기
            item[i].style.display = "flex";
        }else{
            item[i].style.display = "none";
        }
    }
}