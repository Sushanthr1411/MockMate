// lib/gemini.ts
// Small server-side helper to call the Generative Language API (Gemini).
// Defaults to the flash model: gemini-2.5-flash

// intentionally avoid a top-level import from 'google-auth-library' so bundlers
// don't force the package to be resolved at build time. We `require` it at
// runtime when available and treat the client as `any`.

// ADC/service-account flow removed per repo decision. Keep the helper
// simple: require GEMINI_API_KEY (API key or OAuth access token) for auth.

export async function callGemini(prompt: string, opts?: { model?: string; timeoutMs?: number }): Promise<any> {
  const apiKey = process.env.GEMINI_API_KEY;
  const base = process.env.GEMINI_BASE_URL || 'https://generativelanguage.googleapis.com';
  const modelParam = opts?.model || process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  const model = modelParam.startsWith('models/') ? modelParam : `models/${modelParam}`;
  const url = process.env.GEMINI_URL || `${base}/v1/${model}:generate`;

  const body = { contents: [{ parts: [{ text: prompt }] }] };

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };

  // Attach auth header using GEMINI_API_KEY only. ADC/service-account support
  // was intentionally removed to avoid server-only dependencies in the
  // frontend package.
  if (apiKey) {
    if (apiKey.startsWith('ya29.') || apiKey.startsWith('ya29-')) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    } else {
      headers['x-goog-api-key'] = apiKey;
    }
  } else {
    throw new Error('GEMINI_API_KEY is required to call the Generative Language API. Set GEMINI_API_KEY as an API key or access token.');
  }

  const timeoutMs = opts?.timeoutMs ?? 20000;

  const doPost = async (targetUrl: string) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      const text = await res.text().catch(() => '');
      return { ok: res.ok, status: res.status, text };
    } finally {
      clearTimeout(id);
    }
  };

  // Try primary endpoint, retry once on 429/5xx
  const attempt = await doPost(url);
  if (attempt.ok) {
    try {
      return JSON.parse(attempt.text);
    } catch (e) {
      return attempt.text;
    }
  }

  if (attempt.status === 404) {
    // model not found — surface helpful error
    throw new Error(`Gemini model endpoint not found (404). URL: ${url} Response: ${attempt.text}`);
  }

  if (attempt.status === 429 || (attempt.status >= 500 && attempt.status < 600)) {
    // one retry
    const retry = await doPost(url);
    if (retry.ok) {
      try {
        return JSON.parse(retry.text);
      } catch (e) {
        return retry.text;
      }
    }
    throw new Error(`Gemini API error after retry: ${retry.status} ${retry.text}`);
  }

  // client error (4xx other than 404/429)
  if (attempt.status >= 400 && attempt.status < 500) {
    throw new Error(`Gemini API client error: ${attempt.status} ${attempt.text}`);
  }

  throw new Error(`Gemini API unexpected failure: ${attempt.status} ${attempt.text}`);
}
