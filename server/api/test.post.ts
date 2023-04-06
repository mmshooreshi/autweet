import { Configuration, OpenAIApi } from "openai";
const config = useRuntimeConfig()
const configuration = new Configuration({
  apiKey: config.chatgpt.apiKey,
});

const openai = new OpenAIApi(configuration);

export default defineEventHandler(async (event) => {



  const body = await readBody(event)
  const { tweetCount,topicsList,tones,sentiments,focusAreas,userPreferences,inputSamples,language}=body
  const pre_prompt=`"As a bot that generates tweets in ${language}, your task is to create ${tweetCount} tweets covering a range of topics such as ${topicsList}. Incorporate various ${tones} tones and ${sentiments} sentiments to keep your tweets engaging and interesting. Use eye-catching hashtags, mentions, and emojis to grab the reader's attention. Ensure that each tweet is concise, yet within Twitter's 280-character limit. To make your tweets more effective, consider the ${focusAreas} and user preferences. To guide your creativity, use the following input samples: ${inputSamples}. also have in mind, that the user-preferences for these tweets are as follows: ${userPreferences}"`
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content:pre_prompt }],
  });

  // return body;
  const key = config.chatgpt.apiKey
  return completion.data.choices[0].message


})



  // const id = parseInt(event.context.params.id) as number
  // if (!Number.isInteger(id)) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: 'ID should be an integer',
  //   })
  // }