function* fib(max) {
  var a = 0,
    b = 1,
    n = 0;
  while (n < max) {
    yield a;
    [a, b] = [b, a + b];
    n++;
  }
  return;
}
var c = 0;
for (var x of fib(10)) {
  c = x;
}

console.log(c);
