import { createReadStream } from "fs";
import fetch from "node-fetch";

// const config = useRuntimeConfig()
export const config = {
  runtime: 'edge',
};

export default async (event: any) => {
  const {res,req}=event
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Connection", "keep-alive");

  const {
    tweetCount,
    topicsList,
    tones,
    sentiments,
    focusAreas,
    userPreferences,
    inputSamples,
    language,
  } = req.body;

  const prePrompt = `"As a bot that generates tweets in ${language} language, your task is to create ${tweetCount} ${language} tweets covering a range of topics such as ${topicsList}. Incorporate various ${tones} tones and ${sentiments} sentiments to keep your tweets engaging and interesting. Use eye-catching hashtags, mentions, and emojis to grab the reader's attention. Ensure that each tweet is concise, yet within Twitter's 280-character limit. To make your tweets more effective, consider the ${focusAreas} and user preferences. To guide your creativity, use the following input samples: ${JSON.stringify(
    inputSamples
  )}. Please just respond with an Array of Objects, each object, as a tweet. Also have in mind, that the user-preferences for these tweets are as follows: ${JSON.stringify(
    userPreferences
  )}"`;

  const response:any = await fetch("https://api.openai.com/v1/chat/completions", {
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
    const { value, done } = await reader?.read();
    if (done) break;
    const jsonStr = value.substring(6, value.indexOf("\n"));
    const tweet = JSON.parse(jsonStr).choices[0].text.trim();
    if (tweet !== "") {
      res.write(tweet + "\n");
    }
  }

  res.end();
};
