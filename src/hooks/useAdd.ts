import { Ref, ref, watch } from 'vue'

export const useAdd = (num1: Ref<number>, num2: Ref<number>) => {
  const sum: Ref<number> = ref(0)
  const addFn = () => {
    sum.value = num1.value + num2.value
  }

  watch([num1, num2], () => {
    addFn()
  }, {
    immediate: true
  })

  return {
    sum,
    addFn
  }
}