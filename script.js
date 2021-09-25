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
    } 
    // The following "else if" statement needs to be fixed. I think the line '51' is the one with the problem.

    else if (timesOp >= 1 && timesOp !== timesDelOp) {
      result.textContent = result.textContent.substring(0, result.textContent.length - 1);
      if (String(finalNmbrs[finalNmbrs.length-1]) == '') {
        finalNmbrs.pop();
      }
      // The following 4 lines are correct
      var lastNumber = finalNmbrs[finalNmbrs.length-1].toString().substring(0, finalNmbrs[finalNmbrs.length-1].toString().length-1);
      finalNmbrs.pop();
      finalNmbrs.push([lastNumber]);
      console.log(finalNmbrs)
    }
  }
  else {
    result.textContent = result.textContent.substring(0, result.textContent.length - 3);
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
    finalNmbrs.push([numbers.join('')]);
  } else if (digits > 1) {
    finalNmbrs.push(new Array(result.textContent.substring(small+2, smallNumber-1)));
  }
  digits = 0;
  timesOp++;
  timesDelOp++;
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