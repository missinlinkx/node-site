var A = [], B = [], C = [], columns = [A,B,C], moves = [];
var n;
var oLetter,dLetter;

module.exports = run;

function populate (n) {
  for (var i=1;i<=n;i++) { //populate origin column with disks
    A.push(i);
  }
}

function solve (nOD, origin, destination) { //number of disks, origin and dest columns

  //base case, if number of disks is 0, return nothing
  if (nOD === 0) {
    return;
  }

  //find free column
  var free = findFree(origin, destination);

  //move n-1 disks to free (intermediary) column
  solve(nOD-1, origin, free);

  //move nth disk to destination column
  moveDisk(origin, destination);

  //move n-1 disks from the intermediary column to destination
  solve(nOD-1, free, destination);

}

function findFree(origin, destination) {
  var safetyCopy = [].concat(columns);
  safetyCopy.splice(safetyCopy.indexOf(origin), 1);
  safetyCopy.splice(safetyCopy.indexOf(destination), 1);
  return safetyCopy[0];
};

function moveDisk (origin, destination) {
  var disk = origin.shift();
  destination.unshift(disk);
  saveColumns(disk, origin, destination);
}

function arrToLetter (origin, destination) { //stores origin and destination as strings for identification in output
  if (origin === A) {oLetter = "A";}
  else if (origin === B) {oLetter = "B";}
  else {oLetter = "C";}
  if (destination === A) {dLetter = "A";}
  else if (destination === B) {dLetter = "B";}
  else {dLetter = "C";}
}

function saveColumns (disk, origin, destination) {
  arrToLetter(origin,destination);
  var move = {
    "disk": disk,
    "from": oLetter,
    "to": dLetter
  }
  moves.push(move);
}

function run (n) {
  moves = [];
  populate(n);
  solve(n,A,C);
  return moves;
}
