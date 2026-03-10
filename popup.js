const ext = typeof browser !== 'undefined' ? browser : chrome;

// Load saved value
ext.storage.local.get({ maxMessages: 250 }).then((result) => {
  document.getElementById('maxMessages').value = result.maxMessages;
}).catch((err) => {
  console.error('Error loading:', err);
});

// Save when input changes
document.getElementById('maxMessages').addEventListener('change', (e) => {
  const value = parseInt(e.target.value);
  if (value > 0) {
    ext.storage.local.set({ maxMessages: value }).catch((err) => {
      console.error('Error saving:', err);
    });
  }
});
