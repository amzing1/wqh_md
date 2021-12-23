// 443. 压缩字符串
// 给定一组字符，使用原地算法将其压缩。

// 压缩后的长度必须始终小于或等于原数组长度。

// 数组的每个元素应该是长度为1 的字符（不是 int 整数类型）。

// 在完成原地修改输入数组后，返回数组的新长度。

 

// 进阶：
// 你能否仅使用O(1) 空间解决问题？

 

// 示例 1：

// 输入：
// ["a","a","b","b","c","c","c"]

// 输出：
// 返回 6 ，输入数组的前 6 个字符应该是：["a","2","b","2","c","3"]

// 说明：

// class Solution {
//     public:
//         int compress(vector<char>& chars) {
//             int n = chars.size();
//             int w = 0;
//             int b = 0;
//             for (int i = 0; i < n; ++i)
//             {
//                 // 如果是最后一个元素 或者 发现非连续元素，我们需要填写数字
//                 if (i+1 == n || chars[i+1] != chars[i])
//                 {
//                     // 设置字符为当前起点的字符
//                     chars[w] = chars[b];
//                     ++w;
//                     // 判断是否要压缩
//                     if (i > b)
//                     {
//                         int consecutiveNum = i - b + 1;
//                         string numStr = to_string(consecutiveNum);
//                         for (char c : numStr)
//                         {
//                             chars[w] = c;
//                             ++w;
//                         }
//                     }
//                     // 更新起点到下一个开始的位置
//                     b = i + 1;
//                 }
//             }
    
//             return w;
//         }
//     };
    

// function compress(chars) {
//     let anchor = 0;
//     let write = 0;
//     for(let read=0; read<chars.length; read++) {
//         if(read+1===chars.length || chars[read+1]!==chars[read]) {
//             chars[write++] = chars[anchor];
//             if(read > anchor) {

//             }
//         }
//     }
// }
