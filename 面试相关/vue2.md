### vue核心特性

* mvvm：数据驱动
* 组件系统
* 指令系统

### SPA系统

* 局部刷新，用户体验更好
* 项目易于维护
* 不利于seo
* 首屏加载可能较慢

### v-show和v-if

* v-show相当于改变css的display属性， none或者block
* v-show使用场景：该组件需要频繁的显示隐藏
* v-if则是将该dom元素删除或者重新添加
* v-if使用场景：该组件很少切换显示状态

### vue实例挂载过程中发生了什么

* tips：对template的解析步骤
  1. 将html文档片段解析为ast描述符
  2. 将ast描述符解析为字符串
  3. 生成render函数
* 第一步：_init
  * 定义 $set $get $delete $watch等方法
  * 定义 $on $emit $remove $off等事件
  * 定义 _update $forceUpdate $destory等生命周期
* 第二步：调用$mount进行页面的挂载，挂载的时候主要是用过mountComponent方法
* 第三步：定义updateComponent更新函数
* 第四步：执行render生成虚拟dom
* 第五步：_update将虚拟dom生成真实的dom结构，并且渲染到页面中

### 对生命周期的理解

* beforeCreate / created
* beforeMount / mounted
* beforeUpdate / updated
* beforeDestory / destoryed
* active / deactived

### v-if和v-for不要放在一起使用

* v-for的优先级高于v-if, 浪费性能
* 在vue3中修复了这个bug

### spa应用首屏加载慢怎么解决

* 路由懒加载 ()=>import('./about.vue')
* ui框架按需引入
* 图片压缩，雪碧图
* gzip压缩
* 使用ssr

### data属性为什么是一个函数

* 如果是一个对象那么所用该组件实例都共享这个data对象了
* 函数相当于一个工厂方法，使得每一个该组件实例的data是独享，占据不同的内存空间

### vue给对象添加新属性界面不刷新

* 直接添加相当于这个属性上没有使用响应式
* Vue.$set()
* this.someObj = Object.assign({}, this.somObj,  {a:1,b:2})
* $forceUpdate() 不要使用

### vue中组件和插件的区别

* 组件就是把图形和非图形的逻辑抽象为一个统一的概念来实现开发的模式
  * 降低系统耦合度
  * 调试方便
  * 提高可维护性
* 插件通常用来为vue添加全局功能

区别： 

* 编写形式 ， 插件的编写需要暴露一个install方法
* 注册形式，Vue.component / Vue.use
* 使用场景，component是实现业务逻辑的地方，而插件是用于增强Vue

### vue组件间通信的方式

* props / $emit
* this.$children / this.$parent
* this.$refs
* provide / inject
* eventBus
* vuex

### 双向绑定

* v-model
* 数据劫持+发布订阅模式

### nextTick的理解

* 当你修改了数据的时候，dom是异步更新的
* 如果你要立即拿到更新后的dom的相关信息，就是用nextTick

### vue mixin的理解

* 混入
* 多个组件需要应用到同样的功能，就可以抽出共同代码，使用混入
* 替换型：props / methods / inject / computed
* 和并型：data
* 队列型：生命周期钩子和watch
* 叠加型：components / directives / filters

### vue slot的理解

* 相当于一个占位符

* 默认插槽

* 具名插槽

* 作用域插槽：子组件在作用域上绑定属性来将子组件的信息传给父组件使用，这些属性会被挂在父组件v-slot接受的对象上

  ​			父组件在使用时通过v-slot获取子组件的信息，在内容中使用

### vue observable是什么

* vue observable 可以让一个对象编程响应式数据。vue内部会用它来处理data函数返回的对象
* 返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新

### vue中key的原理

* map，查询效率更快，更准确更快速地找到对应的vnode
* 例子：数组插入，没有key插入索引后的所有节点都会发生更新，有key所有节点都不更新只有一次插入dom操作

### keep-alive

* 内置组件，keep-alive包裹动态组件时，能在组件切换过程中将状态保存在内存中，防止重复渲染dom
* include / exclude / max

### vue常用的修饰符

* 表单修饰符：lazy / trim / number
* 事件修饰符：.stop / .prevent / .self / .once / .capture / .native
* 鼠标修饰符：.left / .right / .middle

### vue自定义指令

* 全局注册

```vue
Vue.directive('focus', {
	inserted: function(el) {
		el.focus();
	}
})
```

* 局部注册

``` vue
directives: {
	focus: {
		interted: function(el) {
			el.focus();
		}
	}
}
```

* 应用：防抖 / 图片懒加载 / 拖拽

### 虚拟dom节点

* 本质就是一个js对象，最少有tag，children，attrs 三个属性
* 原生dom节点太重了，操作原生dom代价昂贵

### vue中的diff算法

* 比较只会在同层级进行，不会跨层级比较
* 在diff比较过程中，循环从两边向中间比较

### vue项目中封装axios

* 如果每个页面都要发送类似的请求，都要写一堆的配置和错误处理，过于繁琐，所以需要二次封装
* 设置接口请求前缀
* 设置请求头
* 设置对应状态码处理逻辑
* 请求方法
* 请求拦截器
* 相应拦截器

### vue权限管理

* 接口权限 ：jwt
* 路由权限控制：初始化的时候先挂载不需要权限控制的路由，登陆后，获取用户的权限信息，然后筛选有权限访问的路由，在全局路由守卫中调用addRoutes添加路由
* 菜单权限：可以理解成将页面与菜单进行解耦
  * 前端定义路由，后端返回菜单，通过名字判断用户是否有权限
  * 后端返回路由和菜单，前端通过addRoutes动态添加

* 按钮权限：v-if

### vue项目解决跨域问题

* cors：服务器端设置

* proxy: 

  * 在vue.config.js中配置devServe

  ``` js
  module.exports = {
      devServer: {
          host: '127.0.0.1',
          port: 8084,
          open: true,// vue项目启动时自动打开浏览器
          proxy: {
              '/api': { // '/api'是代理标识，用于告诉node，url前面是/api的就是使用代理的
                  target: "http://xxx.xxx.xx.xx:8080", //目标地址，一般是指后台服务器地址
                  changeOrigin: true, //是否跨域
                  pathRewrite: { // pathRewrite 的作用是把实际Request Url中的'/api'用""代替
                      '^/api': "" 
                  }
              }
          }
      }
  }
  axios.defaults.baseURL = '/api'
  ```

  

  * 服务端实现代理请求转发
  * 配置nginx实现代理

### vue项目中的错误处理

* 后端接口错误：通过axios拦截器进行拦截
* 代码逻辑错误：Vue.config.errorHandler = function(err, vm, info) {}

​      

