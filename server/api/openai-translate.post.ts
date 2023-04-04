import { Configuration, OpenAIApi } from 'openai'
interface Translate {
  apiKey: string
  prompt: string
}

export default defineEventHandler(async (event) => {
  const body: Translate = await readBody(event)
  const { prompt  } = body
  const config = useRuntimeConfig()
  const apiKey = config.chatgpt?.apiKey

  const configuration = new Configuration({
    apiKey
  })
  
  const openai = new OpenAIApi(configuration)
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{"role": "system", "content": prompt}],
      temperature: 0.3,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    })
    const translateResult = response.data.choices[0].text
    return translateResult
  } catch (error) {
    return createError({
      data: (error as any).response.data,
      statusMessage: (error as any).message
    })
  }
})
