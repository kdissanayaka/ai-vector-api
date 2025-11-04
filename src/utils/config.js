export default {
  PORT: process.env.PORT || 5000,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY || "",
  EMBEDDING_MODEL: process.env.OPENAI_EMBEDDING_MODEL || "text-embedding-3-small",
};