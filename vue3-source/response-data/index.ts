import { computed } from "./response/computed";
import { effect, toResponseData } from "./response/effect";
import { addJob, flushJob } from "./response/flushJob";
import { DataObj } from "./typings/testData";

// const data: DataObj = {
//   text: "hello world",
//   ok: true,
// };

// const responseData = toResponseData(data);

// effect(() => {
//   console.log("effect");
//   document.body.innerHTML = responseData.ok ? responseData.text : "not";
// });

// setTimeout(() => {
//   responseData.ok = false;
// }, 1000);

// setTimeout(() => {
//   responseData.text = "hello vue3";
// }, 2000);

// const data: DataObj = {
//   text: "hello world",
//   foo: true,
//   bar: true,
// };

// const responseData = toResponseData(data);

// let temp1: boolean, temp2: boolean;

// effect(() => {
//   console.log("effect1 执行");
//   effect(() => {
//     console.log("effect2 执行");
//     temp2 = responseData.bar;
//   });
//   temp1 = responseData.foo;
// });

// responseData.foo = false;

// const data: DataObj = {
//   text: "hello world",
//   count: 0,
// };

// const responseData = toResponseData(data);

// effect(() => {
//   responseData.count++;
//   document.body.innerHTML = responseData.count;
// });

// setInterval(() => {
//   responseData.count += 2;
// }, 1000);

// const data: DataObj = {
//   text: "hello world",
// };
// const obj = toResponseData(data);
// effect(
//   () => {
//     console.log(obj.text);
//   },
//   {
//     scheduler(fn) {
//       addJob(fn);
//       flushJob();
//     },
//   }
// );

// obj.text += "!!!";
// obj.text += "!!!";

// console.log("已经结束咧");

// const data: DataObj = {
//   text: "hello world",
//   foo: "foo",
//   bar: "bar",
// };

// const obj = toResponseData(data);
// const comp = computed(() => obj.foo + obj.bar);
// data.foo = "foo2";
// data.bar = "bar2";
// console.log(comp);

const data: DataObj = {
  text: "hello world",
  foo: "foo",
  bar: "bar",
};

const obj = toResponseData(data);

const sumRes = computed(() => obj.foo + obj.bar);
effect(() => {
  console.log(sumRes.value);
});

obj.foo += "foo";
