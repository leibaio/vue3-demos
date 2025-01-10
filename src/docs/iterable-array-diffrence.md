# 什么是 Iterable 对象，和 Array 区别

## Iterable 对象

- **Iterable** 是一种可以被遍历的对象，实现了 `Symbol.iterator` 方法，返回一个迭代器对象、
- **特点**：
  - 1. 可以使用 for...of 循环遍历，
  - 2. 可以使用 Array.from() 将 Iterable 对象转换为数组，
  - 3. 可以使用 spread 运算符将 Iterable 对象转换为数组，
  - 4. 可以使用 Array.prototype.concat() 将 Iterable 对象与数组进行拼接，
  - 5. 可以使用 Array.prototype.slice() 将 Iterable 对象与数组进行截取，
  - 6. 可以使用 Array.prototype.splice() 将 Iterable 对象与数组进行替换，
  - 7. 可以使用 Array.prototype.map() 将 Iter
- **示例**：Array、String、Map、Set 等都是 Iterable 对象
- **自定义 Iterable**

```js
const myIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};
```

## Array 对象

- **Array** 是 js 的一种特定的数据结构，用于存储有序的元素集合
- **特点** ：1. 是 Iterable 对象的一种；2. 具有固定的长度(length)；3.可以通过索引访问；4. 有多种内置方法，如 push(), pop(), map(), filter() 等
- **示例**：const arr = [1, 2, 3];

## 区别

- 范围：
  - 所有的 Array 都是 Iterable，但不是所有的 Iterable 都是 Array。
  - Iterable 是一个更广泛的概念，包括 Array、String、Map、Set 等。
- 方法和属性：
  - Array 有许多特定的方法和属性（如 length, push, pop 等）。
  - Iterable 对象不一定有这些方法，它们只保证可以被遍历。
- 索引访问：
  - Array 可以通过数字索引直接访问元素（如 arr[0]）。
  - 一般的 Iterable 对象可能不支持这种访问方式。
- 创建和使用：
  - 创建 Array 很简单（如 [] 或 new Array()）。
  - 创建自定义 Iterable 需要实现 Symbol.iterator 方法。
- 功能：
  - Array 专门用于存储和操作有序数据集合。
  - Iterable 更多是一种行为特征，表示对象可以被遍历。
- 灵活性：
  - Iterable 更灵活，可以表示无限序列或惰性计算的序列。
  - Array 总是有限的，且所有元素都立即存在。

```js
// Array（也是 Iterable）
const arr = [1, 2, 3];
for (let item of arr) console.log(item);

// 自定义 Iterable（不是 Array）
const myIterable = {
  *[Symbol.iterator]() {
    yield 1;
    yield 2;
    yield 3;
  },
};
for (let item of myIterable) console.log(item);

// 可以工作
console.log([...myIterable]); // [1, 2, 3]

// 会报错
console.log(myIterable.length); // undefined
console.log(myIterable[0]); // undefined
```
