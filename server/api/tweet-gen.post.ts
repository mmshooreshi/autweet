import { Configuration, OpenAIApi } from "openai";

// const config = useRuntimeConfig()
export const config = {
  runtime: 'edge',
};
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default defineEventHandler(async (event) => {

  event.node.res.setHeader('Content-Type', 'text/plain');
    event.node.res.setHeader("Transfer-Encoding", "chunked");
    // event.node.res.setHeader("X-Content-Type-Options","nosniff");
    event.node.res.setHeader("Connection", "keep-alive");
  

  const body = await readBody(event);
  const {
    tweetCount,
    topicsList,
    tones,
    sentiments,
    focusAreas,
    userPreferences,
    inputSamples,
    language,
  } = body;

  const prePrompt = `"As a bot that generates tweets in ${language} language, your task is to create ${tweetCount} ${language} tweets covering a range of topics such as ${topicsList}. Incorporate various ${tones} tones and ${sentiments} sentiments to keep your tweets engaging and interesting. Use eye-catching hashtags, mentions, and emojis to grab the reader's attention. Ensure that each tweet is concise, yet within Twitter's 280-character limit. To make your tweets more effective, consider the ${focusAreas} and user preferences. To guide your creativity, use the following input samples: ${JSON.stringify(
    inputSamples
  )}. Please just respond with an Array of Objects, each object, as a tweet. Also have in mind, that the user-preferences for these tweets are as follows: ${JSON.stringify(
    userPreferences
  )}"`;


  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ "role": "user", "content": prePrompt }],
      max_tokens: 2000,
      stream: true,
      stop: ["\n\n"],
    }),
  });






  const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();

  while (true) {
    let j =""
    const res:any = await reader?.read();
    console.log(res.value)
  //   try{
  //     const text=res.value
  //     const jsonStr = text.substring(6, text.indexOf("\n"));          
  //     j =JSON.parse(jsonStr).choices[0].delta.content
  //     console.log(j)
  //     event.node.res.write(j)
  // }
  // catch(e){
  //   // console.log(e)
  // }
    try{
      event.node.res.write(JSON.parse(res.value.substring(6, res.value.indexOf("\n"))).choices[0].delta.content)
  }
    catch(e){}
    // event.node.res.write("\r\n");

    if (res?.done){ break;}
    console.log("Received", res?.value);
  }

  

  event.node.res.end();
});
