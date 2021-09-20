let acceptingNumber = true;
let acceptNumber = true;
const del = document.getElementById('btndel');
const esc = document.getElementById('btnesc');

function falsing() {
  acceptingNumber = false;
}

function falseing() {
  acceptNumber = false;
}

// function ifif() {
//    if (acceptingNumber === false) return;
// }

// function ififif() {
//    if (acceptNumber === false) return;
// }

function acceptingDigits() {
    if (result.textContent.charAt(result.textContent.length-1) !== ' ') {
      acceptingNumber = true;
    }
}

del.addEventListener('click', function() {
  if (result.textContent.charAt(result.textContent.length-1) !== ' ') num1.splice(-1, 1);
  else result.textContent.substring(0, result.textContent.length - 3);
  result.textContent = String(num1.join(''));
  if (num1.join('') == '') result.textContent = '0';
  acceptingDigits();
})

esc.addEventListener('click', function() {
    result.textContent = '0';
    num1 = [];
    acceptingDigits();
})