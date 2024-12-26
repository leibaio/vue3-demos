# Vuex 中的 Mutations 和 Actions

Mutations 和 Actions 是 Vuex 中两个重要的概念，它们在状态管理中扮演不同的角色。以下是它们的主要区别：
目的：
Mutations: 用于直接修改状态（state）。
Actions: 用于处理异步操作和复杂逻辑，最终可能会触发一个或多个 mutation。
同步 vs 异步：
Mutations: 必须是同步函数。
Actions: 可以包含异步操作。
调用方式：
Mutations: 通过 store.commit() 调用。
Actions: 通过 store.dispatch() 调用。
参数：
Mutations: 接收 state 作为第一个参数，payload（可选）作为第二个参数。
Actions: 接收 context 对象作为第一个参数，payload（可选）作为第二个参数。
业务逻辑：
Mutations: 应该只包含最简单的状态修改逻辑。
Actions: 可以包含任意异步操作和复杂的业务逻辑。
触发其他操作：
Mutations: 不能触发其他 mutation。
Actions: 可以触发其他 action 和 mutation。
追踪和调试：
Mutations: 每个 mutation 被记录，方便追踪状态变化。
Actions: action 本身不被追踪，但它触发的 mutation 会被追踪。
示例代码：
const store = createStore({
  state: {
    count: 0
  },
  mutations: {
    // Mutation
    increment(state, amount) {
      state.count += amount
    }
  },
  actions: {
    // Action
    incrementAsync({ commit }, amount) {
      setTimeout(() => {
        commit('increment', amount)
      }, 1000)
    }
  }
})

// 使用 mutation
store.commit('increment', 1)

// 使用 action
store.dispatch('incrementAsync', 1)

在这个例子中：
`increment` 是一个 mutation，直接修改 state。
`incrementAsync` 是一个 action，包含异步操作，最后触发 `increment` mutation。
总结：
使用 Mutations 进行同步的状态修改。
使用 Actions 处理异步操作和复杂逻辑，然后通过提交 Mutations 来修改状态。
这种设计使得状态变化更可预测和易于追踪，同时允许处理复杂的异步逻辑。
