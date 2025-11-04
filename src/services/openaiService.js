import OpenAI from "openai";
import config from "../utils/config.js";

const apiKey = process.env.OPENAI_API_KEY || config.OPENAI_API_KEY;
if (!apiKey) {
  throw new Error("Missing OPENAI_API_KEY. Set it in .env or environment variables.");
}

const client = new OpenAI({ apiKey });

export async function getEmbeddings(inputs) {
  if (!Array.isArray(inputs) || !inputs.length) throw new Error("No input texts provided");
  const model = process.env.OPENAI_EMBEDDING_MODEL || config.EMBEDDING_MODEL;
  const resp = await client.embeddings.create({ model, input: inputs });
  return resp.data.map(item => item.embedding);
}