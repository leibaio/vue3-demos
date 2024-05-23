import { useRouter } from 'vue-router'

export function useNavigation() {
  const router = useRouter()

  const goToHome = () => { router.push('/') }
  const goToMouseLight = () => { router.push('/mouse-light') }

  return {
    goToHome,
    goToMouseLight
  }
}