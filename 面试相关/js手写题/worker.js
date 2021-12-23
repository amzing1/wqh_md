//worker的基本使用：
//主线程: 
// let worker = new Worker('./worker.js'); 
// worker.postMessage(data); 
// worker.onmessage=function(event) {
//     console.log(event.data)  //event.data中就是worker线程计算得到的结果
//     worker.terminate() //得到结果之后关闭worker线程
// }
//worker.js

self.addEventListener('message', function(e){
    console.log(e.data);
    
    for(let i=0; i<100000000; i++) {
        e.data.number += i;
    }
    //向主线程发送计算得到的结果
    self.postMessage(e.data.number);
    //自己关闭自己
    self.close();
})