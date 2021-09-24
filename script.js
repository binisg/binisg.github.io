let numbers = [];
let result = document.getElementById('btnresult');
let nmbr = document.getElementsByClassName('btn');
const del = document.getElementById('btndel');
const esc = document.getElementById('btnesc');
const add = document.getElementById('btnplus');
const minus = document.getElementById('btnminus');
const times = document.getElementById('btntimes');
const divide = document.getElementById('btndivide');
const eql = document.getElementById('btnequal');
let finalNmbrs = [];
let digits = 0;

function clickNumber() {
  for (i of nmbr) {
      i.addEventListener('click', function() {
        var currentNumber = this.textContent;
        if (result.textContent.includes('+') === false && result.textContent.includes('-') === false && result.textContent.includes('x') === false && result.textContent.includes(':') === false) {
          numbers.push(currentNumber);
          finalNmbrs.push([numbers.join('')]);
          result.textContent = numbers.join('');
        } else {
            result.textContent += currentNumber;
        }

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
    finalNmbrs = [];
})

function digiting() {
  for (i=0; i<result.textContent.length; i++) {
    if (result.textContent[i] === '+') digits++;
    if (result.textContent[i] === '-') digits++;
    if (result.textContent[i] === 'x') digits++;
    if (result.textContent[i] === ':') digits++;
  };

  var smallNumber = Math.max(result.textContent.lastIndexOf('+'), result.textContent.lastIndexOf('-'), result.textContent.lastIndexOf('x'), result.textContent.lastIndexOf(':'), result.textContent.lastIndexOf('='));
  let small = Math.max(result.textContent.lastIndexOf('+', smallNumber-1), result.textContent.lastIndexOf('-', smallNumber-1), result.textContent.lastIndexOf('x', smallNumber-1), result.textContent.lastIndexOf(':', smallNumber-1));
  if(digits <= 1) {
    finalNmbrs.splice(0, numbers.length-1);
  } else if (digits > 1) {
    finalNmbrs.push(new Array(result.textContent.substring(small+2, smallNumber-1)));
  }
  digits = 0;
}

function addOperator(op) {
  result.textContent += ' ' + String(op) + ' ';
}

add.addEventListener('click', function(event) {
  addOperator('+');
  if (result.textContent.charAt(result.textContent.length-3) == ' ' && result.textContent.charAt(result.textContent.length-4) == ' ') {
    result.textContent = result.textContent.substring(0, result.textContent.length - 3);
    event.preventDefault();
    return;
  }

  digiting();
})

minus.addEventListener('click', function() {
  addOperator('-');
  digiting();
})

times.addEventListener('click', function() {
  addOperator('x');
  digiting()
})

divide.addEventListener('click', function() {
  addOperator(':');
  digiting();
})

eql.addEventListener('click', function() {
  addOperator('=');
  digiting;
})