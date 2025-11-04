const store = new Map();
export async function upsertVectors(ids = [], vectors = [], texts = [], namespace = "default") {
  if (!vectors.length) return false;
  const list = store.get(namespace) || [];
  for (let i = 0; i < vectors.length; i++) {
    list.push({
      id: ids[i] || `${Date.now()}-${i}`,
      vector: vectors[i],
      text: texts[i] ?? null,
    });
  }
  store.set(namespace, list);
  return true;
}

export async function getVectors(namespace = "default") {
  return store.get(namespace) ?? [];
}