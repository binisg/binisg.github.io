let calculation = [];
let result = document.getElementById('btnresult');
let nmbr = document.getElementsByClassName('btn');
let del = document.getElementById('btndel');
let esc = document.getElementById('btnesc');

result.textContent = '0';

for (i of nmbr) {
    i.addEventListener('click', function() {
      var currentNumber = this.textContent;
      calculation.push(currentNumber);
      result.textContent = String(calculation.join(''));
      if (calculation.join('') == '00') {
        calculation = [];
        result.textContent = '0';
      };
    });
}

del.addEventListener('click', function() {
    calculation.splice(-1);
    result.textContent = String(calculation.join(''));
    if (calculation.join('') == '') result.textContent = '0';
})

esc.addEventListener('click', function() {
    result.textContent = '0';
    calculation = [];
})