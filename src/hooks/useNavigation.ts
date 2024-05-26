import { useRouter } from 'vue-router'

export function useNavigation() {
  const router = useRouter()

  const goToHome = () => { router.push('/') }
  const goToMouseLight = () => { router.push('/mouse-light') }
  const goToAdd = () => { router.push('add') }

  return {
    goToHome, goToMouseLight, goToAdd
  }
}