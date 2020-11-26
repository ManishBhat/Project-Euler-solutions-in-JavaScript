function f(n) {
  if (n === 1) return 1
  if (n % 2 === 0) {
    return f(n / 2) + 1
  } else {
    return f(3 * n + 1) + 1
  }
}

function f2(n, memo){
    if (n < memo.length && memo[n] != -1) { return memo[n];}
    if (n%2 == 0){
        memo[n] = f(n/2) + 1;
        return memo[n];
    }
    else{
        memo[n] = f(3*n+1) + 1;
        return memo[n];
    }
}

function main(){
  var memo = [];
  N = 1000000;
  for(var i = 1; i < N; i++) {
    memo[i] = -1
  }
  memo[1] = 1;
  max_seq_len = 1;
  max_n = 1;
  for(var i = 1; i<N; i++) {
    f2(i, memo);
    if(memo[i] > max_seq_len) {
      max_seq_len = memo[i];
      max_n = i;
    }
  }
  console.log(max_n);
}

console.time('main')
main()   // The function you're measuring time for 
console.timeEnd('main')