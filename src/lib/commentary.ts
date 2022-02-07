import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export async function generateCommentary(keywords: string) {
  return await openai.createCompletion("text-davinci-001", {
    prompt: `Make football commentary from the following keywords:\n\n${keywords}`,
    temperature: 0.3,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0.8,
    presence_penalty: 0,
  });
}

export async function generateThumbnail(keywords: string) {
  const response = await fetch(
    "https://bing-image-search1.p.rapidapi.com/images/search?q=" + keywords,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "bing-image-search1.p.rapidapi.com",
        "x-rapidapi-key": "1d4c89c95fmsh612414620a77f06p139de2jsnea4e6212e2c3",
      },
    },
  );
  const res = await response.json();
  const random = Math.floor(Math.random() * res.value.length);
  return res.value[random].contentUrl;
}
