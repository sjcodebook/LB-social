export default function getDistinctArray(arr) {
  var dups = {};
  return arr.filter(function(el) {
    var hash = el.valueOf();
    var isDup = dups[hash];
    dups[hash] = true;
    return !isDup;
  });
}
