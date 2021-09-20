let num1 = [];
let num2 = [];
let result = document.getElementById('btnresult');
let nmbr = document.getElementsByClassName('btn');
const del = document.getElementById('btndel');
const esc = document.getElementById('btnesc');
const add = document.getElementById('btnplus');
const eql = document.getElementById('btnequal')
let acceptingNumber = true;
let acceptNumber = true;

function firstNumber() {
  for (i of nmbr) {
      i.addEventListener('click', function() { // When the user clicks the element,
        if (acceptingNumber === false) return;
        var currentNumber = this.textContent; // take the element's number,
        num1.push(currentNumber); // and add it to the 'num1' array.
        result.textContent = String(num1.join('')); // Then take the result's text content and add to it the element's number.
        if (num1.join('') == '00') { // If the users presses double zeros,
          num1 = []; // delete all the array items,
          result.textContent = '0'; // and show '0'.
        };
      });
  }
}

function secondNumber() {
  for (i of nmbr) {
      i.addEventListener('click', function() { // When the user clicks the element,
        if (acceptNumber === false) return;
        var currentNumber = this.textContent; // take the element's number,
        num2.push(currentNumber); // and add it to the 'num1' array.
        result.textContent += String(currentNumber) // Then take the result's text content and add to it the element's number.
        if (num2.join('') == '00') { // If the users presses double zeros,
          num2 = []; // delete all the array items,
          result.textContent += '0'; // and show '0'.
        };
      });
  }
}

firstNumber();

function acceptingDigits() {
  if (result.textContent.charAt(result.textContent.length-1) !== ' ' && acceptNumber === false) {
    acceptingNumber = true;
  }
}

del.addEventListener('click', function() {
  if (result.textContent.charAt(result.textContent.length-1) !== ' ') result.textContent = result.textContent.substring(0, result.textContent.length - 1);
  else result.textContent = result.textContent.substring(0, result.textContent.length - 3);
  if (result.textContent == '') result.textContent = '0';
  acceptingDigits();
})

esc.addEventListener('click', function() {
    result.textContent = '0';
    num1 = [];
    acceptingDigits();
})

add.addEventListener('click', function() {
  result.textContent += ' ' + '+' + ' ';
  acceptingNumber = false;
  if (result.textContent.charAt(result.textContent.length-3) == ' ' && result.textContent.charAt(result.textContent.length-4) == ' ') {
    result.textContent = result.textContent.substring(0, result.textContent.length - 3);
  }
  secondNumber();
})

eql.addEventListener('click', function() {
  result.textContent += ' ' + '=' + ' ';
  acceptNumber = false;
  if (result.textContent.charAt(result.textContent.length-3) == ' ' && result.textContent.charAt(result.textContent.length-4) == ' ') {
    result.textContent = result.textContent.substring(0, result.textContent.length - 3);
  }
})