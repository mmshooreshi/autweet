import { Configuration, OpenAIApi } from 'openai'
interface TweetGen {
  focusAreas: []
  inputSamples: string
  language: string
  tones: []
  sentiments: string
  topicsList: string
  tweetCount: number
  userPreferences: []
}

export default defineEventHandler(async (event) => {
  const body: TweetGen = await readBody(event)  
  const { tweetCount,topicsList,tones,sentiments,focusAreas,userPreferences,inputSamples,language}=body
  // console.log(body)
  const pre_prompt = `"Please act as a bot that generates tweets in ${language} language. Use the following prompt to generate ${tweetCount} tweets on various topics such as ${topicsList}. Incorporate ${sentiments} sentiments and use eye-catching hashtags, mentions, and emojis. Make sure each tweet is concise yet within Twitter's 280-character limit. Use the following input samples to guide your creativity: ${inputSamples}. "`
  const prompt = `"🌟💫 Generate ${tweetCount} mind-blowing ${language} tweets on extraordinary topics like ${topicsList}! Set the vibe with these tones: ${tones}. also bring ${sentiments} sentiment into your tweet contents. and unleash creativity using eye-catching hashtags, mentions, and emojis. 🚀🎭 Focus your magic on ${focusAreas}. Craft each tweet to be a one-of-a-kind gem, concise yet within Twitter's 280-character realm. 🌈🔮 Line 'em up with a newline separator. Tailor tweets to ${userPreferences} for an out-of-this-world experience! ✨🌍 Let these dazzling input samples light your way: ${inputSamples}. 🎇🔥 all in ${language} language"`
  //console.log(prompt)
  // console.log("\n \n")
  const config = useRuntimeConfig()
  const apiKey = config.chatgpt?.apiKey

  const configuration = new Configuration({
    apiKey
  })
  // console.log(apiKey)
  
  const openai = new OpenAIApi(configuration)
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{"role": "system", "content": "You are a professional tweet generator."}, {"role":"user", "content":prompt}],
      temperature: 0.6,
      max_tokens: 2000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    })
    console.log(response)
    const tweetGenResult = response.data.choices[0].message?.content
    return tweetGenResult
  } catch (error) {
    return createError({
      data: (error as any).response.data,
      statusMessage: (error as any)
    })
  }
})
