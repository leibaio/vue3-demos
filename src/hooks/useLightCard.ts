import { onMounted, onUnmounted, ref } from "vue"

export const useLightCard = () => {
  // 是否展示光
  const showLight = ref(false)
  // 获取卡片的 dom 节点
  const cardRef = ref<HTMLElement | null>(null)
  let cardOverflow = ''
  // 获取光的 dom 节点
  const lightRef = ref<HTMLElement | null>(null)

  // 设置卡片的 overflow 为 hidden
  const setCardOverflowHidden = () => {
    const cardDom = cardRef.value;
    if (cardDom) {
      cardOverflow = cardDom.style.overflow;
      cardDom.style.overflow = 'hidden';
    }
  }
  // 还原卡片的 overflow
  const restoreCardOverflow = () => {
    const cardDom = cardRef.value;
    if (cardDom) {
      cardDom.style.overflow = cardOverflow;
    }
  }
  // 监听卡片的鼠标移入
  const onMouseEnter = () => {
    setCardOverflowHidden()
    showLight.value = true
  }
  // 监听卡片的鼠标移动
  const onMouseMove = (e: MouseEvent) => {

    // 获取鼠标的坐标
    const { clientX, clientY } = e
    // 让光跟随鼠标
    const cardDom = cardRef.value;
    const lightDom = lightRef.value;
    if (cardDom && lightDom) {
      // 获取卡片相对于窗口的x和y坐标
      const { x, y } = cardDom.getBoundingClientRect()
      // 获取光的宽高
      const { width, height } = lightDom.getBoundingClientRect()
      lightDom.style.left = `${clientX - x - width / 2}px`
      lightDom.style.top = `${clientY - y - height / 2}px`

      // // 设置动画效果
      // const maxXRotation = 10; // x 轴旋转角度
      // const maxYRotation = 10; // y 轴旋转角度

      // const rangeX = 200 / 2; // x 轴旋转的范围
      // const rangeY = 200 / 2; // y 轴旋转的范围

      // const rotateX = ((clientX - x - rangeY) / rangeY) * maxXRotation; // 根据鼠标在 y 轴上的位置计算 x 轴旋转角度
      // const rotateY = -1 * ((clientY - y - rangeX) / rangeX) * maxYRotation; // 根据鼠标在 y 轴上的位置计算 y 轴旋转角度

      // cardDom.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` // 设置 3D 透视
    }
  }
  // 监听卡片的鼠标移出
  const onMouseLeave = () => {
    restoreCardOverflow()
    showLight.value = false
  }

  onMounted(() => {
    cardRef.value?.addEventListener('mouseenter', onMouseEnter)
    cardRef.value?.addEventListener('mousemove', onMouseMove)
    cardRef.value?.addEventListener('mouseleave', onMouseLeave)
  })

  onUnmounted(() => {
    cardRef.value?.removeEventListener('mouseenter', onMouseEnter)
    cardRef.value?.removeEventListener('mousemove', onMouseMove)
    cardRef.value?.removeEventListener('mouseleave', onMouseLeave)
  })

  return {
    showLight,
    cardRef,
    lightRef
  }
}