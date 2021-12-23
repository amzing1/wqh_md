### 数组新增了那些扩展

* 扩展运算符在数组中的使用 ...

* ```js
  Array.of(1,2,3)
  Array.from()
  ```

* 新增了一些方法：

```js
copyWithin()
find()
findIndex()
fill()
entries()
keys()
values()
includes()
flat()
flatMap()
```

* 数组的空位明确转为undefined
* sort（）设置为稳定的算法

### 对象新增了那些扩展

* 属性的简写

```js
let a = 1;
let b = 2;
let obj = {a,b};   //等价于let obj={a:a,b:b}
```

* 属性表达式

```js
let obj = {
    ['hello'+'world']: 'helloworld'
}
```

* super关键字：指向当前对象的原型对象
* 扩展运算符的使用：浅拷贝，等同于Object. assign

* 属性的遍历：数值键->字符串键->symbol键

* 对象新增的方法：

```js
Ojbect.is()
Object.assign()
Object.getOwnPropertyDescriptors()
Object.setProptotypeOf() // 用来设置一个对象的原型对象
Object.keys()
Object.values()
Ojbject.entries()
Object.fromEntries()
```

### 函数新增了那些扩展

* 函数参数默认值
* 属性： length / name 
* 箭头函数
* 带有参数默认值自身有一个作用域

### Set,Map

* 集合 add/delete/clear/has    keys/values/entries/forEach
* 字典 size属性/get/set/has/clear/delete    keys/values/entries/forEach
* weakSet / weakMap

### Promise

* 对象的状态不受外部影响，只有异步操作的结果可以决定当前的状态
* 一旦状态改变，就不会再变了

### Module

* AMD和commonjs都是在运行时确定模块的依赖关系的，而es6是在运行前就能确定了
* export / import
* 动态加载：

```js
import('./modules/myModule.js').then(module => {
    //do something with the module
})
```



