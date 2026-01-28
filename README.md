<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1o0Eem8bH9rtyrAkgxw5J9x4jKzPRzPH6

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow that builds and deploys on every push to `main`.

1. In your GitHub repo, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Push to `main` (or merge a PR into `main`) to trigger the deploy.
3. Visit: `https://<your-username>.github.io/pantone-match/`

Notes:
- The Vite base path is already set to `/pantone-match/` for this repo name.
- If you fork or rename the repo, update `base` in `vite.config.ts`.
