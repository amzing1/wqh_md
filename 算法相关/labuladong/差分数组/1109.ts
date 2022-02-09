/***
 * 这里有 n 个航班，它们分别从 1 到 n 进行编号。

有一份航班预订表 bookings ，表中第 i 条预订记录 bookings[i] = [firsti, lasti, seatsi] 意味着在从 firsti 到 lasti （包含 firsti 和 lasti ）的 每个航班 上预订了 seatsi 个座位。

请你返回一个长度为 n 的数组 answer，里面的元素是每个航班预定的座位总数。

 */

export function corpFlightBookings(bookings: [number, number, number][], n: number): number[] {
  const answer = new Array(n).fill(0)
  const diff = new Array(n).fill(0)
  for (let i = 0, l = bookings.length; i < l; i++) {
    const [start, end, seats] = bookings[i]
    diff[start - 1] += seats
    if (end < n) {
      diff[end] -= seats
    }
    console.log(diff)
  }
  answer[0] = diff[0]
  for (let i = 1; i < n; i++) {
    answer[i] = answer[i - 1] + diff[i]
  }
  return answer
}