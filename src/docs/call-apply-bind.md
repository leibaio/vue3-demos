# call、apply、bind

用于改变函数执行时的上下文（this）的指向

## 介绍

### call

- 语法：`func.call(thisArg, arg1, arg2, ...)`
- 立即执行函数
- 第一个参数指定了函数运行时候的 this，后面的参数是传递给函数的参数

```js
function greeting(greeting) {
  console.log(greeting + " " + this.name);
}

const person = { name: "John" };

greeting.call(person, "Hi");
```

### apply

- 语法：`func.apply(thisArg, [argsArray])`
- 立即执行函数
- 第一个参数指定了函数运行时候的 this，第二个参数是传递给函数的参数，必须是一个数组

```js
function greet(greeting, punctuation) {
  console.log(greeting + " " + this.name + punctuation);
}
const person = {
  name: "Arthur Morgen",
};

greet.apply(person, ["Hello", "!"]);
```

### bind

- 语法：`func.bind(thisArg, arg1, arg2, ...)`
- 不会立即执行，返回一个新的函数
- 第一个参数指定了函数运行时候的 this，后面的参数是传递给函数的参数

```js
function greet(greeting) {
  console.log(greeting + " " + this.name);
}
const person = {
  name: "Arthur Morgen",
};

const boundGreet = greet.bind(person);
boundGreet("Hello");
```

## 主要区别

> 执行时机

- call、apply 立即执行，bind 不立即执行
- bind 返回一个新的函数，可以多次调用

> 参数传递

- call 接收一系列参数
- apply 接收一个数组参数
- bind 可以预设一部分参数，返回的新函数可以接受剩余参数

> 返回值

- call 和 apply 返回执行的结果
- bind 返回一个新的函数

> 使用场景

- call：需要明确指定 `this` 值的场景
- apply：需要传递数组作为参数的场景
- bind：需要创建一个固定 `this` 值的新函数的场景，如事件处理或回调函数

> 性能

- `call` 通常比 `apply` 快，因为不需要处理数组
- `bind` 在创建新函数时有轻微的性能开销，但对于多次调用同一个函数可能更有效率
