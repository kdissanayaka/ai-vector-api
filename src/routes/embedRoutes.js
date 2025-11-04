import express from "express";
import { getEmbeddings } from "../services/openaiService.js";
import { upsertVectors } from "../services/vectorService.js";

const router = express.Router();

router.post("/embed", async (req, res) => {
  try {
    const { text, texts, namespace, store } = req.body;
    const inputs = [];

    if (typeof text === "string" && text.trim()) inputs.push(text);
    if (Array.isArray(texts) && texts.length) inputs.push(...texts.filter(Boolean));

    if (!inputs.length) return res.status(400).json({ error: "Provide 'text' or 'texts' in request body" });

    const embeddings = await getEmbeddings(inputs);

    if (store) {
      const ids = embeddings.map((_, i) => `${Date.now()}-${i}`);
      await upsertVectors(ids, embeddings, inputs, namespace);
      return res.json({ ok: true, storedIds: ids, embeddings });
    }

    return res.json({ ok: true, embeddings });
  } catch (err) {
    console.error("POST /embed error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
});

export default router;