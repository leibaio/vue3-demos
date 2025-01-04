# EventLoop

[可视化网址](http://latentflip.com/loupe/?code=!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

```js
setTimeout(function () {
  console.log(1);
}, 100);

console.log(2);

setTimeout(function () {
  console.log(3);
}, 0);

// 2
// 3
// 1
```

_解释_：js 是单线程的，这就意味着所有任务需要排队，前一个任务完成了，才会执行后一个任务。为了解决排队等待问题，js 的任务分为同步和异步任务。所有同步任务都在主线程上，形成一个 Stack；异步任务不进入主线程，而是进入一个队列，当主线程同步任务执行完毕时，再从队列中取出异步任务，执行。
异步任务又分为宏任务和微任务，常见的宏任务有：setTimeout、setInterval、setImmediate、I/O、UI rendering；微任务有：Promise、MutationObserver、process.nextTick。微任务优先级高于宏任务。
