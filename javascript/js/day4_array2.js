// MAP 예제들
function example1() {
    const numbers = [1, 2, 3, 4, 5];

    // 기존 방식(반복문)
    const oldWay = [];
    for (let i = 0; i < numbers.length; i++) {
        oldWay.push(numbers[i] * numbers[i]);
    }

    console.log(oldWay); //(5) [1, 4, 9, 16, 25]

    // map 방식
    const newWay = numbers.map(num => num * num);
    //console.log(newWay); //(5) [1, 4, 9, 16, 25]

    document.getElementById('result1').innerHTML = `
    <p><strong>원본:</strong>[${numbers.join(', ')}]</p>
    <p><strong>제곱 결과:</strong>[${newWay.join(', ')}]</p>
    <p><strong>코드:</strong>numbers.map(num =>num * num)</p>
    `;
}