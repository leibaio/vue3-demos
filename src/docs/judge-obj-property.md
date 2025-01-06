# 判断对象是否有某个属性的方法

[airbnb-javascript-style](https://github.com/airbnb/javascript)

```js
const obj = {
  name: "qwe",
  age: 11,
};

if ("name" in obj) {
  console.log("对象有 name 属性");
}

if (obj.hasOwnProperty("name")) {
  console.log("对象有自己的 name 属性");
}

if (Object.prototype.hasOwnProperty.call(obj, "name")) {
  console.log("对象有自己的 name 属性");
}

if (obj.name !== undefined) {
  console.log("对象有 name 属性");
}

if (Object.keys(obj).includes("name")) {
  console.log("对象有自己的 name 属性");
}

if (obj?.name !== undefined) {
  console.log("对象有 name 属性");
}

if (Object.hasOwn(obj, "name")) {
  console.log("对象有自己的 name 属性");
}
```

1. `in` 运算符：`in` 运算符用于判断一个对象是否包含某个属性。如果对象存在该属性，则返回 true，否则返回 false。
2. `hasOwnProperty` 方法：`hasOwnProperty` 方法用于判断一个对象是否包含某个属性，并且该属性是该对象的直接属性（即该属性存在于该对象中，而不是存在于该对象的原型链上）。**注意**：`hasOwnProperty()` 只检查对象自身的属性，不检查原型链上的属性。
3. `Object.prototype.hasOwnProperty.call` 方法：`Object.prototype.hasOwnProperty.call` 方法更安全，因为它可以避免对象可能覆盖 `hasOwnProperty` 方法的情况。
4. `name` !== undefined：`name` !== undefined 用于判断一个对象是否包含某个属性，并且该属性的值不为 undefined。**注意**：这种方法可能会有误判，因为属性的值可能被显式设置为 `undefined`。
5. `Object.keys(obj).includes("name")`：`Object.keys(obj)` 用于获取对象的所有属性名，然后使用 includes 方法判断是否包含某个属性。
6. 使用可选链操作符 `?.`（ES2020+）。
7. `Object.hasOwn(obj, "name")`：`Object.hasOwn(obj, "name")` (ES2022+)，最新的静态方法，推荐使用。
