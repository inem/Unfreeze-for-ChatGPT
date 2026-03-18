# Unfreeze for ChatGPT

Browser extension (Chromium + Firefox) that makes long ChatGPT conversations load instantly.

## The problem

ChatGPT conversations with 1000+ messages freeze the browser tab — sometimes for minutes, sometimes permanently. Even reopening the tab doesn't help because ChatGPT tries to render all messages at once.

## How it works

Unfreeze intercepts the ChatGPT API response and shows only the last 250 messages. The full conversation stays cached in memory — click "Load more" to scroll back through earlier messages.

- Conversations that used to freeze now load in under 2 seconds
- "Load more" button at the top loads earlier messages in batches
- Footer shows message count: "Showing last 250 of 3870 messages"
- Inline status in the header area during loading

## Install

### From Chrome Web Store
*(Coming soon)*

### From source (Chromium: Chrome, Edge, Brave, etc.)
1. Clone this repo
2. Go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" → select this folder

### From source (Firefox, temporary)
1. Use Firefox 128+ (required for MV3 `MAIN` world content script support)
2. Clone this repo
3. Open `about:debugging#/runtime/this-firefox`
4. Click "Load Temporary Add-on..."
5. Select this repo's `manifest.json`

Temporary Firefox installs are removed when Firefox restarts. Persistent distribution requires a signed add-on package.

## Configuration

Default message limit is 250. To change:

Click the extension icon in your browser toolbar and set the desired value in the popup.

## Privacy

No data leaves your browser. No analytics, no tracking, no external servers. See [privacy-policy.md](privacy-policy.md).

## How it works (technical)

The extension patches `window.fetch` at `document_start` (MAIN world) to intercept calls to `/backend-api/conversation/[id]`. On first load, it fetches the full conversation, caches it in memory, and returns a truncated version (last N messages) to React. The "Load more" button prepends earlier messages from the cache.

A small isolated-world bridge script is used only to read extension storage and pass `maxMessages` into MAIN world.

Uses [chatgpt-ui.js](https://github.com/inem/chathpt-ui.js) for DOM manipulation.

## License

MIT
