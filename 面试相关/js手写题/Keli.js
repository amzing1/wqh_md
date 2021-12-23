function Sum(...args) {
    let sum = 0;
    for(let arg of args) {
        sum += arg;
    }
    return function(...argus) {
        if(argus.length === 0) return sum;
        let sum2 = argus.reduce((prev, next) => {return prev + next}, 0)
        return Sum(sum + sum2);
    }
}

console.log(Sum(1,2,3,4)(5,6)()); 