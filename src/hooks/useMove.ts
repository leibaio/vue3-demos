import { onMounted, onUnmounted, reactive, Ref, toRefs } from "vue";

interface PositionState {
  x: number;
  y: number;
}

interface UseMoveReturn {
  x: Ref<number>;
  y: Ref<number>;
}

export const useMove = (): UseMoveReturn => {
  const position = reactive<PositionState>({
    x: 0,
    y: 0,
  });

  const handleKeyup = (e: KeyboardEvent) => {
    console.log("[ e ] >", e);
    switch (e.code) {
      case "ArrowUp":
        position.y--;
        break;
      case "ArrowDown":
        position.y++;
        break;
      case "ArrowLeft":
        position.x--;
        break;
      case "ArrowRight":
        position.x++;
        break;
    }
  };

  onMounted(() => {
    window.addEventListener("keyup", handleKeyup);
  });

  onUnmounted(() => {
    window.removeEventListener("keyup", handleKeyup);
  });

  return { ...toRefs(position) };
};
