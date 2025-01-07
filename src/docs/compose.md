# 如何实现 compose 函数，进行函数合成

[问题来源](https://q.shanyue.tech/fe/js/182)

**描述**：实现一个 compose 函数，进行函数合成。比如 redux 中的 compose，react 高阶组件连续调用时的 compose

```js
const add10 = (x) => x + 10;
const mul10 = (x) => x * 10;
const add100 = (x) => x + 100;

// (10 + 100) * 10 + 10 = 1110
compose(add10, mul10, add100)(10);
```

```js
function compose(...funcs) {
  // 如果没有传入函数，返回一个恒等函数
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  // 如果只有一个函数，直接返回该函数
  if (funcs.length === 1) {
    return funcs[0];
  }
  // 如果有多个函数，将这些函数组合成一个新的函数
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}

const add10 = (x) => x + 10;
const mul10 = (x) => x * 10;
const add100 = (x) => x + 100;

const result = compose(add10, mul10, add100)(10);
console.log(result); // 输出: 1110
```
