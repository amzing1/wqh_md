

function Rabbit(n: number): number {
  if(n === 1 || n === 2) {
    return 1;
  }
  let cur = 1;
  let front = 1;
  for(let i = 3; i < n; i++) {
    let temp = cur;
    cur = front + cur;
    front = temp;
  }
  return front + cur;
}

console.log(Rabbit(3));
console.log(Rabbit(4));
console.log(Rabbit(5));

