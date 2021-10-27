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

        // If the numbers on the result bar are more than 26, then delete one and add the other.
        // Does not infect calc arrays. Exists for overflow hiding purposes.
        while (result.textContent.length >= 26) {
          result.textContent = result.textContent.substring(1);
        };
      });
  }
}

clickNumber();

del.addEventListener('click', function() {
  if (result.textContent.charAt(result.textContent.length-1) !== ' ') { // if deleting a number,
    if (timesOp == 0) { // if there is no operators,
      result.textContent = result.textContent.substring(0, result.textContent.length - 1); // delete one number from the text,
      numbers.pop(); // and cut it from the 'numbers' array too.
    } else if (timesOp >= 1 && timesOp == timesDelOp) { // Else if there are operators in the text,
      result.textContent = result.textContent.substring(0, result.textContent.length - 1); // just delete a number from the text content (the number isn't stored anywhere).
    } else if (timesOp >= 1 && timesOp !== timesDelOp) { // Lastly, if there are operators but they are not equal to the deleted operators,
      result.textContent = result.textContent.substring(0, result.textContent.length - 1); // delete a number from the text.
      var lastNumber = finalNmbrs[finalNmbrs.length-1].toString().substring(0, finalNmbrs[finalNmbrs.length-1].toString().length-1);
      finalNmbrs.pop();
      finalNmbrs.push([lastNumber]);
      if (String(finalNmbrs[finalNmbrs.length-1]) == '') { // If 'finalNmbrs' array's last item is '',
        finalNmbrs.pop(); // then delete the item.
      }
    }
  }
  else {
    result.textContent = result.textContent.substring(0, result.textContent.length - 3);
    finalNmbrs.splice(0, finalNmbrs.length-2);
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

// FULL UPDATE - This project turned out to be a lot bigger than I expected. I could make it the simple way,
// but I didn't. There are a lot of bugs, which makes sence, considering that this is my first one. So, here
// is a list with all the known issues to be fixed. Hopefully I will come back soon. Until then, I will start
// simple with other cool (but smaller) projects.
//
//
// LIST_OF_ERRORS:
//
// 1) The overflow issue. This issue happens when the digits on the text content exceed the 26-digit available
// space. It gets complicating dealing with both digits (which I have come to a solution), and operators, that
// add extra space before and between the operator itself. I guess I could, but not prefer, to not put space at
// in these two spots.
//
// 2) The 'numbers' array issue. I can see that issue exist when adding a first number to the calculation, then
// add the first operator, then delete the operator, then add it again. The number, in this case, is added twice
// in the 'finalNmbrs' array, plus the operator.
//
// 3) The first text digit problem. A simple one, actually. The operation should start with a number, and only a 
// number (specifically an integer number).
//
// 4) Backspace when timesOp are not equal with timesDelOp. I have written a pretty much unspecific piece of code
// there. I need to find a way to delete properly and correctly (can't think how now it's late).
//
// 5) Comments. I should add comments to explain the hard parts of my code.

function addOperator(op) {
  while (result.textContent.length >= 29) {
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
