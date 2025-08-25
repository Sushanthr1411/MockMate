# Frontend local setup

This project currently uses a local mock for resume analysis in the frontend.

There are no server-side Gemini/Generative Language API calls in this branch per the user's request. The analysis UI uses a hard-coded mock result so the app functions without external AI credentials.

If you later want to re-enable real API calls, you'll need to:

- Reintroduce a server API route and a Gemini client helper.
- Provide either a GEMINI_API_KEY or configure Application Default Credentials via GOOGLE_APPLICATION_CREDENTIALS.

For now, no additional environment variables are required to run the frontend locally.
