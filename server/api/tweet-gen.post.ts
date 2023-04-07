import { Configuration, OpenAIApi } from "openai";

const config = useRuntimeConfig()
const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default defineEventHandler(async (event) => {
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

  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "You are a professional tweet generator." },
      { role: "user", content: prePrompt },
    ],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 2000,
    stream: true,
    n: 1,
  });

  event.node.res.writeHead(200, {
    "Content-Type": "application/json",
    "Transfer-Encoding": "chunked",
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  for await (const chunk of completion.data.choices) {
    event.node.res.write(JSON.stringify({ success: true, data: chunk }));
    event.node.res.write("\r\n");
  }

  event.node.res.end();
});
