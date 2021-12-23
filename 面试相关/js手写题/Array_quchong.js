function quchong(arr) {
    return Array.from(new Set(arr))
}

let arr = [1,2,3,4,5,6,7,3,4,4]
console.log(quchong(arr));