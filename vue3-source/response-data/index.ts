import { effect, toResponseData } from "./response/effect";
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
