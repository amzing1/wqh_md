### 01

1. 冒泡排序
2. 选择排序
3. 插入排序
4. 二分查找（局部最小问题）
5. 亦或运算
   * （在一个数组中找唯一的出现奇数次的数，在一个数组中找唯二的出现奇数次的数）
   * a ^ a = 0; a ^ 0 = a
   * 满足交换律，结合律

### 02

1. master方法求递归时间复杂度
2. 归并排序（小和问题，逆序对）
3. 快速排序（荷兰国旗）

### 03

1. 堆结构
   * 大根堆，小根堆
   * heapInsert，heapify
   * 堆排序
2. 桶排序（不基于比较的排序，应用范围较窄）

3. 排序总结

|          | 时间复杂度 | 空间复杂度 | 稳定性 |
| -------- | ---------- | ---------- | ------ |
| 选择排序 | O(N*N)     | O(1)       | no     |
| 冒泡排序 | O(N*N)     | O(1)       | yes    |
| 插入排序 | O(N*N)     | O(1)       | yes    |
| 归并排序 | O(N*logN)  | O(N)       | yes    |
| 快速排序 | O(N*logN)  | O(logN)    | no     |
| 堆排序   | O(N*logN)  | O(1)       | no     |

### 04

1. 无序表，有序表（Map，Set）
2. 链表
   * 反转链表
   * 重要技巧：快慢指针，哈希表
3. 两个链表的第一个相交节点

​			判断两个链表是否有环并获得第一个入环节点（快慢指针判断是否有环，有环的话快指针回到头节点，满指针不动，随后都一步一步往下走，第一个相遇的节点就是入环节点）

​			都是无环的状况，判断两个链表的尾节点是否地址相同并同时获取两个链表的长度，若地址不同则不想交，若相同则让长链表先走长度差值步，随后两个链表一起走就可以到达两个链表的第一个相交节点

​			一个有环一个无环不可能相交

​			两个都有环的状况：

​			若两个入环节点地址相同，则相当于让这个入环节点作为两个链表的尾节点，复用无环链表相交的代码

​			若两个入环节点地址不同，则让其中一个入环节点继续往下走，再遇到自己之前能否遇上另一个入环节点，遇不上代表两个链表不想交，遇上了则返回两个入环节点中的任意一个都可以

### 05

1. 二叉树

   * 前序，中序，后序（递归序，第一次遇见，第二次遇见，第三次遇见）
   * 递归实现，非递归实现
   * 判断一棵树是否是搜索二叉树（中序遍历是递增的）
   * 判断一棵树是否是完全二叉树（层次遍历，若一个节点有右无左，false，在有右无左的条件满足下，发现了第一个只有左孩子的节点，那么后续所有的节点都必须是叶子结点，否则false
   * 二叉树刷题套路：需要左子树的哪些信息，需要右子树的哪些信息，成立条件是什么，在根节点进行递归判断。树型dp

### 06

1. 图的表示
   * 邻接表
   * 邻接矩阵
2. 图的算法
3. * 深度遍历
   * 宽度遍历
   * prim算法：求连通图中的最小生成树算法
   * 拓扑排序：给有向无环图中的节点排序
   * Dijkstra：求单源最短路径算法

### 07

1. 前缀树
1. 贪心

### 08

1. 哈希函数的几个特性

### 09

1. 岛问题
2. 并查集
3. KMP算法：判断一个字符串中是否包含另一个字符串，通过构建next数组来将O(N*N)降至O(N)
4. manacher算法：判断回文字符串中的最大长度

### 10

1. 双端队列：存的是数组索引，r动push，保证队列顺序严格递减，若不能做到就要从后面弹出（相等也弹出）直接丢弃，l动就从前面弹出过期索引。解决问题：滑动窗口中每个窗口中的最大值和最小值
2. 单调栈：栈中存的是索引，索引代表的数据应该递增或者递减。解决问题：求一个数组中的某个位置离它最近的的最大值，左边或右边都可以。在stack需要 pop的时候，当前元素就是右边比栈顶索引大且离栈顶索引最近的的索引，栈顶元素的下一个pop就是左边且离最近的比他大的索引

### 11	![screenshot-20220606-162450](C:\Users\Administrator.DESKTOP-SF0FPR4\Desktop\screenshot-20220606-162450.png)

### 12

1. 滑动窗口
2. 打表法，输入一个整数，输出一个整数，通过输出数字找规律
3. 预处理：如果发现需要频繁的查询
