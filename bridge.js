/**
 * Refinery 003 — bridge between extension storage and MAIN world
 *
 * content.js runs in MAIN world (to patch window.fetch).
 * MAIN world has no direct access to extension storage APIs.
 * This script runs in ISOLATED world (default) and forwards settings.
 */

function postSettings(settings) {
  window.postMessage({
    source: 'refinery-003-settings',
    maxMessages: settings.maxMessages,
  }, '*');
}

if (typeof browser !== 'undefined' && browser.storage?.local) {
  browser.storage.local
    .get({ maxMessages: 250 })
    .then(postSettings)
    .catch(() => postSettings({ maxMessages: 250 }));
} else if (typeof chrome !== 'undefined' && chrome.storage?.local) {
  chrome.storage.local.get({ maxMessages: 250 }, postSettings);
}
