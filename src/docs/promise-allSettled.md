# Promise 有哪几种状态，allSettled 是什么

## Promise 有哪几种状态

Promise 的三种状态：
**Pending（待定）**：初始状态，既不是成功，也不是失败状态。
**Fulfilled（已兑现）**：意味着操作成功完成。
**Rejected（已拒绝）**：意味着操作失败。
Promise 的状态只能从 Pending 变为 Fulfilled 或 Rejected，且**状态一旦改变就不能再变**。

```js
const promises = [
  Promise.resolve(33),
  new Promise((resolve) => setTimeout(() => resolve(66), 0)),
  99,
  Promise.reject(new Error("an error")),
];

Promise.allSettled(promises).then((results) => console.log(results));

// 输出:
// [
//   { status: 'fulfilled', value: 33 },
//   { status: 'fulfilled', value: 66 },
//   { status: 'fulfilled', value: 99 },
//   { status: 'rejected', reason: Error: an error }
// ]
```

- 这个方法在处理多个可能会失败的异步操作时特别有用，因为它允许您获取每个操作的结果，而不会因为某个操作的失败而中断整个过程。
