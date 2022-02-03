const { windowManager } = require('node-window-manager')





windowManager.requestAccessibility();

const window = windowManager.getWindows();

// Prints the currently focused window title.
console.log(window);