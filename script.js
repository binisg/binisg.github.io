let numbers = [];
let result = document.getElementById('btnresult');
let nmbr = document.getElementsByClassName('btn');
const del = document.getElementById('btndel');
const esc = document.getElementById('btnesc');
const add = document.getElementById('btnplus');
const eql = document.getElementById('btnequal');
var olol = [];


function clickNumber() {
  for (i of nmbr) {
      i.addEventListener('click', function() {
        var currentNumber = this.textContent;
        if (result.textContent.includes('+') === false) {
          numbers.push(currentNumber);
          olol.push(numbers);
          result.textContent = numbers.join('');
        } else {
            result.textContent += currentNumber;
            olol.push([currentNumber]);
        }
        
        var count = 0;
        for (let i=0; i<result.textContent.length; i++) {
          if(result.textContent[i] == '+') count++;
        }
        var splicing = 1 + count;
        olol.splice(splicing);

        if (numbers.join('') == '00') {
          numbers = [];
          result.textContent = '0';
        };
      });
  }
}

clickNumber();

del.addEventListener('click', function() {
  if (result.textContent.charAt(result.textContent.length-1) !== ' ') result.textContent = result.textContent.substring(0, result.textContent.length - 1);
  else result.textContent = result.textContent.substring(0, result.textContent.length - 3);
  if (result.textContent == '') result.textContent = '0';
})

esc.addEventListener('click', function() {
    numbers = [];
    result.textContent = '0';
})

function chinese() {
  return;
}

add.addEventListener('click', function() {
  result.textContent += ' ' + '+' + ' ';
  if (result.textContent.charAt(result.textContent.length-3) == ' ' && result.textContent.charAt(result.textContent.length-4) == ' ') {
    result.textContent = result.textContent.substring(0, result.textContent.length - 3);
  }
  // chinese();
})

eql.addEventListener('click', function() {
  result.textContent += ' ' + '=' + ' ';
  acceptNumber = false;
  if (result.textContent.charAt(result.textContent.length-3) == ' ' && result.textContent.charAt(result.textContent.length-4) == ' ') {
    result.textContent = result.textContent.substring(0, result.textContent.length - 3);
  }
})

console.log(olol)