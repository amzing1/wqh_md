// 珂珂喜欢吃香蕉。这里有 N 堆香蕉，第 i 堆中有 piles[i] 根香蕉。警卫已经离开了，将在 H 小时后回来。

// 珂珂可以决定她吃香蕉的速度 K （单位：根/小时）。每个小时，她将会选择一堆香蕉，从中吃掉 K 根。如果这堆香蕉少于 K 根，她将吃掉这堆的所有香蕉，然后这一小时内不会再吃更多的香蕉。  

// 珂珂喜欢慢慢吃，但仍然想在警卫回来前吃掉所有的香蕉。

// 返回她可以在 H 小时内吃掉所有香蕉的最小速度 K（K 为整数）

// function minEatingSpeed(piles: number[], h: number): number {
//   piles.sort((a, b) => a - b);
//   const n = piles.length;
//   const t = h / n; // 吃每一堆要花的时间
//   let left = 0;
//   let right = n - 1;
//   while(left <= right) {

//   }

// };

// class Solution {
//   public:
//       int minEatingSpeed(vector<int>& piles, int H) {
//           int lo = 1, hi = pow(10, 9);
//           while (lo < hi) {
//               int mi = lo + (hi - lo) / 2;
//               if (!possible(piles, H, mi))
//                   lo = mi + 1;
//               else
//                   hi = mi;
//           }
  
//           return lo;
//       }
  
//       // Can Koko eat all bananas in H hours with eating speed K?
//       bool possible(vector<int>& piles, int H, int K) {
//           int time = 0;
//           for (int p: piles)
//               time += (p - 1) / K + 1;
//           return time <= H;
//       }
//   };
  
