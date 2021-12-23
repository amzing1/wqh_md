// 分治法：
// 1.先从数列中取出一个数作为基准数
// 2.分区过程，将比这个数大的全部放在他的右边，小于或等于他的数全部放到他的左边
// 3.在对左右区间重复第二步，直到各区间只有一个数

function quickSort(arr, left, right) {
    if(left < right) {
        let i=left;
        let j=right;
        let x=arr[left];
        while(i<j) {
            while(i<j && arr[j]>=x) {
                j--;
            }
            if(i<j) {
                arr[i++] = arr[j];
            }
            while(i<j && arr[i]<=x) {
                i++;
            }
            if(i < j) {
                arr[j--] = arr[i];
            }
        }
        arr[i] = x;
        quickSort(arr, left, i-1);
        quickSort(arr, i+1, right);
    }
}

let arr = [5,3,6,2,9,1,3,2,7];
quickSort(arr,0,arr.length-1);
console.log(arr);
