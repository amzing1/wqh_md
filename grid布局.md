### 简述

Grid布局是将容器划分为“行”和“列”，产生单元格，然后制定“项目所在”的单元格，可以看作二维布局。Grid布局远比Flex布局强大

### 基本概念

* 采用网格布局的区域，称为“容器”（container）。容器内部采用网格定位的子元素，称为“项目”（item）。
* 容器里面的水平区域称为“行”（row），垂直区域称为“列”（column）。
* 行和列的交叉区域，称为“单元格”（cell）
* 划分网格的线称为“网格线”（grid line）

### 容器属性

* display: grid / display: inline-grid

  注意：设为网格布局后，容器子元素的float，display: inline-block，display: table-cell，vertical-align等设置都将失效（和flex一样）

* grid-template-columns：定义每一列的列宽

* grid-template-rows：定义每一行的行高

  关键字：

  * repeat()：重复某个值或者某个模式
  * auto-fill：单元格大小固定，容器大小不确定。如果希望每一行或每一列容纳尽可能多的单元格，可以使用auto-fill关键字
  * fr：类似于flex布局中子元素的flex属性
  * minmax()：产生一个长度范围
  * auto：让浏览器自己决定，只要没设置max / min 之类的，就是剩余空间吧
  * 网格线的名称

  examples：

  ```css
  .container {
      display: grid;
      grid-template-columns: 100px 100px 100px;
      grid-template-columns: 33.33% 33.33% 33.33%;
      grid-template-columns: repeat(3, 33.33%);
      grid-template-columns: repeat(3, 100px 50px 100px);
      gird-template-columns: repeat(auto-fill, 100px);
      grid-template-columns: 200px 1fr 2fr;
      grid-template-columns: 100px auto 100px;
      grid-template-columns: [c1] 100px [c2] 100px [c3] 100px;
      grid-template-rows: [r1] 100px [r2] 100px [r3] 100px;
  }
  ```

* grid-row-gap：行间距

* grid-column-gap：列间距

* grid-gap：简写形式

* grid-template-areas：网格布局允许指定区域 

* grid-auto-flow：默认是row，决定是“先行后列” 还是 “先列后行”

* justify-items：水平对齐方式    start / end / center / stretch

* align-items：垂直对齐方式    属性值同上

* place-items：简写形式

* justify-content：整个内容区域的水平位置    start / end / center / stretch /       space-around / space-between / space-evenly（项目与项目的间隔相等）

* align-content：整个内容区域的垂直位置 属性值同上

* place-content：简写形式

* grid-auto-columns：浏览器自动生成项目的列宽

* grid-auto-rows：浏览器自动生成项目的行高

### 项目属性

* grid-column-start
* grid-column-end
* grid-row-start
* grid-row-end

项目的位置是可以指定的，具体方法就是制定项目的四个边框，分别定位在那根网格线上，从1开始计数噢

* grid-column：简写形式
* grid-row：简写形式
* grid-area：指定项目放在哪一个区域
* justify-self
* align-self
* place-self





