import { Configuration, OpenAIApi } from "openai";
const config = useRuntimeConfig()
const configuration = new Configuration({
  apiKey: config.chatgpt.apiKey,
});

const openai = new OpenAIApi(configuration);


export default defineEventHandler(async (event) => {

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Hello world" }],
  });


  const body = await readBody(event)

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