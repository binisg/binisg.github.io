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
let timesOp = 0;
let timesDelOp = 0;
let op1 = 0; op2 = 0; op3 = 0; op4 = 0;

function clickNumber() {
  for (i of nmbr) {
      i.addEventListener('click', function() {
        var currentNumber = this.textContent;
        if (result.textContent.includes('+') === false && result.textContent.includes('-') === false && result.textContent.includes('x') === false && result.textContent.includes(':') === false) {
          numbers.push(currentNumber);
          result.textContent = numbers.join('');
        } else {
            result.textContent += currentNumber;
        }
        if (numbers.join('') == '00') {
          numbers = [];
          result.textContent = '0';
        };
        if (result.textContent[result.textContent.length-2] == '0' && result.textContent[result.textContent.length-2] == '0' && result.textContent[result.textContent.length-3] == ' ') {
          result.textContent = result.textContent.substring(0, result.textContent.length - 1);
        };

        while (result.textContent.length >= 26) {
          result.textContent = result.textContent.substring(1);
        };
      });
  }
}

clickNumber();

del.addEventListener('click', function() {
  if (result.textContent.charAt(result.textContent.length-1) !== ' ') {
    if (timesOp == 0) {
      result.textContent = result.textContent.substring(0, result.textContent.length - 1);
      numbers.pop();
      finalNmbrs.splice(0, finalNmbrs.length);
    } else if (timesOp >= 1 && timesOp == timesDelOp) {
      result.textContent = result.textContent.substring(0, result.textContent.length - 1);
    } else if (timesOp >= 1 && timesOp !== timesDelOp) {
      result.textContent = result.textContent.substring(0, result.textContent.length - 1);
      if (String(finalNmbrs[finalNmbrs.length-1]) == '') {
        finalNmbrs.pop();
      }
      var lastNumber = finalNmbrs[finalNmbrs.length-1].toString().substring(0, finalNmbrs[finalNmbrs.length-1].toString().length-1);
      finalNmbrs.pop();
      finalNmbrs.push([lastNumber]);
    }
  }
  else {
    result.textContent = result.textContent.substring(0, result.textContent.length - 3);
    finalNmbrs.pop();
    timesOp--;
  }
  if (result.textContent == '') result.textContent = '0';
})

esc.addEventListener('click', function() {
    result.textContent = '0';
    finalNmbrs = [];
    numbers = [];
    timesOp = [];
    timesDelOp = [];
    op1 = 0; op2 = 0; op3 = 0; op4 = 0;
})

function digiting(op) {
  if (result.textContent.charAt(result.textContent.length-3) == ' ' && result.textContent.charAt(result.textContent.length-4) == ' ') {
     result.textContent = result.textContent.substring(0, result.textContent.length - 3);
     finalNmbrs.pop();
     result.textContent = result.textContent.substring(0, result.textContent.length-2)
     result.textContent += op + ' ';
     return;
   }
  for (i=0; i<result.textContent.length; i++) {
    if (result.textContent[i] === '+') digits++;
    if (result.textContent[i] === '-') digits++;
    if (result.textContent[i] === 'x') digits++;
    if (result.textContent[i] === ':') digits++;
    if (result.textContent[i] === '=') digits++;
  };

  var smallNumber = Math.max(result.textContent.lastIndexOf('+'), result.textContent.lastIndexOf('-'), result.textContent.lastIndexOf('x'), result.textContent.lastIndexOf(':'), result.textContent.lastIndexOf('='));
  let small = Math.max(result.textContent.lastIndexOf('+', smallNumber-1), result.textContent.lastIndexOf('-', smallNumber-1), result.textContent.lastIndexOf('x', smallNumber-1), result.textContent.lastIndexOf(':', smallNumber-1));
  if(digits <= 1) {
    finalNmbrs.push([numbers.join('')]);
  } else if (digits >= 2) {
    finalNmbrs.push(new Array(result.textContent.substring(small+2, smallNumber-1)));
  }
  digits = 0;
  timesOp++;
  timesDelOp++;
}

function addOperator(op) {
  while (result.textContent.length >= 26) {
    result.textContent = result.textContent.substring(1);
  };
  result.textContent += ' ' + String(op) + ' ';
}

add.addEventListener('click', function() {
  addOperator('+');
  digiting('+');
  finalNmbrs.push('+');
})

minus.addEventListener('click', function() {
  addOperator('-');
  digiting('-');
  finalNmbrs.push('-');
})

times.addEventListener('click', function() {
  addOperator('x');
  digiting('x');
  finalNmbrs.push('x');
})

divide.addEventListener('click', function() {
  addOperator(':');
  digiting(':');
  finalNmbrs.push(':');
})

function calculate(op) {
  switch (op) {
    case 'Times':
      var x = finalNmbrs.indexOf('x');
      var prev = finalNmbrs[x-1];
      var aft = finalNmbrs[x+1];
      var calc = Number(prev) * Number(aft);
      finalNmbrs.splice(finalNmbrs.indexOf(prev), 3, calc);
      op3--;
      break;

      case 'Divide':
      var y = finalNmbrs.indexOf(':');
      var prev = finalNmbrs[y-1];
      var aft = finalNmbrs[y+1];
      var calc = Number(prev) / Number(aft);
      finalNmbrs.splice(finalNmbrs.indexOf(prev), 3, calc);
      op4--;
      break;
      
  case 'Plus':
      var z = finalNmbrs.indexOf('+');
      var prev = finalNmbrs[z-1];
      var aft = finalNmbrs[z+1];
      var calc = Number(prev) + Number(aft);
      finalNmbrs.splice(finalNmbrs.indexOf(prev), 3, calc);
      op1--;
      break;
      
  case 'Minus':
      var e = finalNmbrs.indexOf('-');
      var prev = finalNmbrs[e-1];
      var aft = finalNmbrs[e+1];
      var calc = Number(prev) - Number(aft);
      finalNmbrs.splice(finalNmbrs.indexOf(prev), 3, calc);
      op2--;
      break;
  }
}

eql.addEventListener('click', function() {
  addOperator('=');
  digiting();
  finalNmbrs = finalNmbrs.flat();
  for (i=0; i<finalNmbrs.length; i++) {
    if (finalNmbrs[i] === '+') op1++;
    if (finalNmbrs[i] === '-') op2++;
    if (finalNmbrs[i] === 'x') op3++;
    if (finalNmbrs[i] === ':') op4++;
  };

  if (op3 !== 0) {
    while (op3 !== 0) {
      calculate('Times');
    }
  }
  if (op4 !== 0) {
    while (op4 !== 0) {
      calculate('Divide');
    }
  }
  if (op1 !== 0) {
    while (op1 !== 0) {
      calculate('Plus');
    }
  }
  if (op2 !== 0) {
    while (op2 !== 0) {
      calculate('Minus');
    }
  }
  finalNmbrs.splice(0, finalNmbrs.length-1);
  result.textContent = finalNmbrs.reduce((x, y) => x + y);
  finalNmbrs = [];
  numbers = result.textContent.split('');
  timesOp = [];
  timesDelOp = [];
  op1 = 0; op2 = 0; op3 = 0; op4 = 0;
})
