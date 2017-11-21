
console.log("Hoisted: " + leHoist(3));

function leHoist(me) {
  if (me < 2) {
    return 1;
  }
  else {
    return leHoist(me - 1) + leHoist(me - 2);
  }
}

iDoNotWork();

var iDoNotWork = function() {
  console.log("This will not hoist!");
};