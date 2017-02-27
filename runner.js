var run = require('./hanoi-serv.js');

var result = run(3);

if (result) {
  result.forEach(function (item, idx) {
    console.log(idx+1,":",item);
  });
} else {
  console.log('whoops?');
}
