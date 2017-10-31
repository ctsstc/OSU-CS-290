
function isObject(obj) {
  return typeof obj == 'object' && obj != null;
}

function deepEqual(obj1, obj2) {
  if (isObject(obj1) && isObject(obj2)) {
    if (obj1.length == obj2.length) {      
      for (prop in obj1) {
        if (obj2.hasOwnProperty(prop)) {
          if (!deepEqual(obj1[prop], obj2[prop])) {
            return false;
          }
        }
        else {
          return false;
        }
      }
      // If we make it here then it made it through the loop without any falsities
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return obj1 === obj2;
  }
}

var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true