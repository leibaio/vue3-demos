# Array(100).map(x => 1)结果

`Array(100)` 会创建一个稀疏数组，不存在真是元素，节省内存空间。控制台上显示为 `[empty]`

因为没有元素，所以也不会有 `[map]` 操作

注：`Array.prototype.map()` 创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成

注：`Array.prototype/.forEach()` 方法是对数组中的每个元素执行一次给定的函数

```javascript
const x = Array(100).map((x) => 1);
console.log("[ x ] >", x);

const y = Array.from(Array(100), (x) => 1);
console.log("[ y ] >", y);

const z = Array(100).fill(1);
console.log("[ z ] >", z);
```

```bash
[ x ] > (100) [empty × 100]
[ y ] > (100) [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
[ z ] > (100) [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
```
