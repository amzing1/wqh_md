/* 滑动窗⼝算法框架 */
void slidingWindow(string s, string t) {
 unordered_map<char, int> need, window;
 for (char c : t) need[c]++;

 int left = 0, right = 0;
 int valid = 0;
 while (right < s.size()) {
 // c 是将移⼊窗⼝的字符
 char c = s[right];
 // 右移窗⼝
 right++;
 // 进⾏窗⼝内数据的⼀系列更新
 ...
 /*** debug 输出的位置 ***/
 printf("window: [%d, %d)\n", left, right);
 /********************/

 // 判断左侧窗⼝是否要收缩
 while (window needs shrink) {
 // d 是将移出窗⼝的字符
 char d = s[left];
 // 左移窗⼝
 left++;
 // 进⾏窗⼝内数据的⼀系列更新
 ...
 }
 }
}
