import path from 'path';
const { app, BrowserWindow, Menu } = require('electron');

let settingsWindow;
// Creating new popup window
export function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
    width: 600,
    height: 400,
    frame: true,
    vibrancy: 'under-window',
    visualEffectState: 'active',
    trafficLightPosition: { x: 15, y: 10 },
    // titleBarStyle: 'hidden',
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  // Load a file or URL where your settings form is located
  settingsWindow.loadFile('path/to/settings.html');

  // Handle window closure
  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
}
