let xhr = new XMLHttpRequest();
xhr.open('get', 'url', true);
//如果想要发送额外的http头部，可以使用setRequestHeader()进行设置
//但是必须在open()之后，send（）之前
xhr.setRequestHeader('myHeader', 'myValue');
xhr.send(data);
xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) { //4表示数据已就绪
        if(xhr.status >= 200 && xhr.status <=300 || xhr.status === 304) {
            console.log(xhr.responseText);
        }
    } 
}
//获取响应头部的方法
xhr.getResponseHeader('myHeader');
//获取所有响应头
xhr.getAllResponseHeaders();

//Get请求
// 通过在url后面添加查询字符串参数
// 查询字符串中的每个名和值都必须使用encodeURIComponent()编码，所有名/值必须以&分隔
// encodeURIComponent(name)
// encodeURIComponent(value)

//超时
xhr.timeout = 1000;
//响应超时的回调函数
xhr.ontimeout = function(){}

//跨源资源共享 CORS
// 背后的基本思路就是使用自定义的HTTP头部允许浏览器和服务器互相了解，以确实请求或响应应该成功还是失败

