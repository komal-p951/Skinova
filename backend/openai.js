import OpenAI from 'openai';
import dotenv from "dotenv";

dotenv.config(); 

// const client = new OpenAI({
//   apiKey: process.env.OPEN_AI_API_KEY // This is the default and can be omitted
// });

// const response = await client.responses.create({
//   model: 'gpt-6-luna',
//   instructions: 'You are a coding assistant that talks like a pirate',
//   input: 'hellow how are you',
// });

// console.log(response.output_text);

import "dotenv/config";

const getOpenAIAPIResponse = async(message) => {
    const options = {
    method : "POST",
    headers : {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPEN_AI_API_KEY}`
    },
    body: JSON.stringify({
      model:"gpt-6-luna",
      messages:[{
        role: "user",
        content:message
      }]
    })
  };
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions",options);
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.log(error)
  }
}
export default getOpenAIAPIResponse;