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
