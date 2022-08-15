
### 响应式系统

1. 确定数据结构
2. 分支切换与cleanup

```js
effect(() => {
    proxy.ok ? proxy.value : '';
})
```

3. 嵌套的effect与effect栈

```js
effect(() => {
    console.log('effect1 执行', proxy.a);
    effect(() => {
        console.log('effect2执行', proxy.b)
    })
})
```

4. 避免无限递归执行

```js
effect(() => {
    proxy.a++
})
```

5. 调度执行

```js
effect(() => {
    proxy.a = 1;
    proxy.a = 2;
    proxy.a = 3; // 一个eventloop中只有最后一次设置才触发trigger
})
```

6. 计算属性computed与lazy

```js

```

