// lib/gemini.ts
// Utility to call Gemini API securely from server-side

export async function callGemini(prompt: string): Promise<any> {
  const apiKey = process.env.GEMINI_API_KEY;
  // Allow overriding base URL and model via env. Default to v1/generate for gemini-2.5-pro.
  const base = process.env.GEMINI_BASE_URL || "https://generativelanguage.googleapis.com";
  const model = process.env.GEMINI_MODEL || "gemini-2.5-pro";
  // Normalize to the full model resource name returned by ListModels (e.g. "models/gemini-2.5-pro")
  const modelName = model.startsWith("models/") ? model : `models/${model}`;
  const url = process.env.GEMINI_URL || `${base}/v1/${modelName}:generate`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const headers: any = { "Content-Type": "application/json" };
  if (apiKey) {
    if (apiKey.startsWith("ya29.")) {
      headers["Authorization"] = `Bearer ${apiKey}`;
    } else {
      headers["x-goog-api-key"] = apiKey;
    }
  }

  // retry with exponential backoff for transient errors
  const maxAttempts = 3;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    // If model/endpoint not found (404) try to recover:
    if (res.status === 404) {
      const initialText = await res.text().catch(() => "");
      const listUrl = `${base}/v1/models`;
      try {
        const listRes = await fetch(listUrl, { method: "GET", headers });
        const listText = await listRes.text().catch(() => "");
        if (!listRes.ok) {
          throw new Error(`failed to list models: ${listText}`);
        }

        const listJson = JSON.parse(listText || "{}");
        const available = (listJson.models || []).map((m: any) => m.name);

        // Build prioritized candidate list: prefer configured modelName, then common choices found in the list
        const preferred = [modelName, "models/gemini-2.5-pro", "models/gemini-2.5-flash", "models/gemini-1.5-pro", "models/gemini-1.5-flash"];
        const candidates = Array.from(new Set([
          ...preferred.filter(Boolean),
          ...available,
        ])).slice(0, 20);

        const errors: string[] = [];
        for (const candidate of candidates) {
          try {
            const tryUrl = `${base}/v1/${candidate}:generate`;
            const tryRes = await fetch(tryUrl, { method: "POST", headers, body: JSON.stringify(body) });
            if (tryRes.ok) {
              return tryRes.json();
            }
            const t = await tryRes.text().catch(() => "");
            errors.push(`${candidate} -> ${tryRes.status} ${t}`);
          } catch (e: any) {
            errors.push(`${candidate} -> error ${e?.message || e}`);
          }
        }

        throw new Error(
          `Gemini API error: 404 ${initialText} — attempted fallback models but none succeeded. Tried: ${candidates.join(", ")}. Results: ${errors.join(" | ")}. Available models: ${available.join(", ")}`
        );
      } catch (e: any) {
        throw new Error(
          `Gemini API error: 404 ${initialText} — could not recover by listing models: ${e?.message || e}`
        );
      }
    }

    if (res.ok) {
      return res.json();
    }

    // if client error (4xx) except 429, don't retry
    if (res.status >= 400 && res.status < 500 && res.status !== 429) {
      const text = await res.text().catch(() => "");
      throw new Error(`Gemini API error: ${res.status} ${text}`);
    }

    // last attempt -> throw
    if (attempt === maxAttempts) {
      const text = await res.text().catch(() => "");
      throw new Error(`Gemini API error: ${res.status} ${text}`);
    }

    // backoff before next attempt
    const backoffMs = 500 * Math.pow(2, attempt - 1);
    await new Promise((r) => setTimeout(r, backoffMs));
  }

  throw new Error("Failed to call Gemini API, try again");
}
