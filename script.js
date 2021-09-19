let num1 = [];
let result = document.getElementById('btnresult');
let nmbr = document.getElementsByClassName('btn');
const del = document.getElementById('btndel');
const esc = document.getElementById('btnesc');
const add = document.getElementById('btnplus');
let acceptingNumber = true;

function col() { // When the user clicks the element,
  if (acceptingNumber === false) return;
  var currentNumber = this.textContent; // take the element's number,
  num1.push(currentNumber); // and add it to the 'num1' array.
  result.textContent = String(num1.join('')); // Then take the result's text content and add to it the element's number.
  if (num1.join('') == '00') { // If the users presses double zeros,
    num1 = []; // delete all the array items,
    result.textContent = '0'; // and show '0'.
  };
}

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

firstNumber();

function acceptingDigits() {
  if (result.textContent.charAt(result.textContent.length-1) !== ' ') {
    acceptingNumber = true;
  }
}

del.addEventListener('click', function() {
  if (result.textContent.charAt(result.textContent.length-1) !== ' ') num1.splice(-1, 1);
  else result.textContent.slice(0, -3);
  result.textContent = String(num1.join(''));
  if (num1.join('') == '') result.textContent = '0';
  acceptingDigits();
})

esc.addEventListener('click', function() {
    result.textContent = '0';
    num1 = [];
    acceptingDigits();
})

function testing() {
  result.textContent += ' ' + '+' + ' ';
  acceptingNumber = false;
}

add.addEventListener('click', function() {
  result.textContent += ' ' + '+' + ' ';
  acceptingNumber = false;
})