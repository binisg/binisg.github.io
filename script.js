let num1 = [];
let result = document.getElementById('btnresult');
let nmbr = document.getElementsByClassName('btn');
const del = document.getElementById('btndel');
const esc = document.getElementById('btnesc');
const add = document.getElementById('btnplus');

result.textContent = '0';

for (i of nmbr) {
    i.addEventListener('click', function() { // When the user clicks the element,
      var currentNumber = this.textContent; // take the element's number,
      num1.push(currentNumber); // and add it to the 'num1' array.
      result.textContent = String(num1.join('')); // Then take the result's text content and add to it the element's number.
      if (num1.join('') == '00') { // If the users presses double zeros,
        num1 = []; // delete all the array items,
        result.textContent = '0'; // and show '0'.
      };
    });
}

del.addEventListener('click', function() {
    num1.splice(-1, 1);
    result.textContent = String(num1.join(''));
    if (num1.join('') == '') result.textContent = '0';
})

esc.addEventListener('click', function() {
    result.textContent = '0';
    num1 = [];
})

add.addEventListener('click', function() {
  result.textContent += ' ' + '+' + ' ';
  // somehow make the 'num1' array stop receiving any further numbers.
})