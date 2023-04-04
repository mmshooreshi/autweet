export const userInfoStore = defineStore('userInfoStore', () => {

  const config = useRuntimeConfig()

  const openAiKey = ref(config.chatgpt?.apiKey)

  function setOpenAiKey (key: string) {
    openAiKey.value = key
  }

  return {
    openAiKey,
    setOpenAiKey
  }
})
