var run = require('./palindr-serv.js');

var result = run('abc');

if (result) {
  console.log('we have a palindrome!', result[0], 'in', result[1],'steps');
} else {
  console.log('this word cannot be a palindrome');
}
