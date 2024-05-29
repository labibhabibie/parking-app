/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

import { SerialPort, ReadlineParser } from 'serialport';
let serialPort: any;

class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;
let settingsWindow;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1280,
    height: 720,
    icon: getAssetPath('logo.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));
  // mainWindow.loadURL('file://' + path.join(__dirname, '../index.html#/home'));
  // mainWindow.loadFile(
  //   path.resolve(path.join(__dirname, '../renderer/index.html')),
  // );

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();

  function getUidFromResponse(responseBuffer: any) {
    // Check for DLE STX
    if (responseBuffer.slice(0, 2).toString('hex') !== '1002') {
      throw new Error('Invalid start of frame');
    }
    const data = responseBuffer.slice(11, -3);
    let result = '';
    if (data.slice(0, 1).toString('hex') === '75') {
      const uid = data.slice(7).toString();
      const cardType = data.slice(5, 7).toString();
      result =
        '\n---- CHECk CARD UID ----' +
        '\nCard Type: ' +
        cardType +
        '\nCard UID : ' +
        uid;
    }
    if (data.slice(0, 1).toString('hex') === '42') {
      const cardType = data.slice(5, 7).toString();
      const cardBalance = data.slice(7, 17).toString();
      const balance = parseInt(cardBalance, 10).toLocaleString('id-ID');
      const cardNumber = data.slice(17, 33);
      const uid = data.slice(33, 47).toString();
      result =
        '\n---- CHECk BALANCE ----' +
        '\nCard Type: ' +
        cardType +
        '\nCard Balance: Rp. ' +
        balance +
        '\nCard Number: ' +
        cardNumber +
        '\nCard UID : ' +
        uid;
    }
    return result;
  }

  ipcMain.handle('open-port', async (event, config) => {
    console.log('masuk main');
    console.log(config);
    if (!config || !config.selectedPort) {
      return "Error: 'path' is not defined.";
    }
    console.log('lewat sini');
    serialPort = new SerialPort({
      path: config.selectedPort,
      baudRate: config.selectedBaud,
      autoOpen: false,
    });

    serialPort.open((err: any) => {
      if (err) {
        console.error('port-status', 'Error opening port: ' + err.message);
        return `Error opening port awd: ${err.message}`;
      }
      console.log('port-status', 'Port opened');
    });

    serialPort.on('data', (data: any) => {
      // event.sender.send('serial-data', data.toString('hex'));
      const uid = getUidFromResponse(data);
      event.sender.send('serial-data', uid);
    });
    return `Port ${config.selectedPort} opened`;
  });

  ipcMain.handle('close-serial-port', (event, arg) => {
    // console.log('masuk closing port');
    if (serialPort && serialPort.isOpen) {
      serialPort.close((err: any) => {
        if (err) {
          console.log('Error closing port: ', err.message);
          return `Error closing port: ${arg} closed`;
        }
        console.log('Port closed');
      });
      return `Port ${arg} closed`;
    } else {
      console.log('Tidak ada post yang tersambung');
      return `No port connected`;
    }
  });

  ipcMain.handle('send-command', (event, command) => {
    console.log('ini command' + command);
    const buffer = Buffer.from(command);
    if (serialPort && serialPort.isOpen) {
      serialPort.write(buffer, (err: any) => {
        if (err) {
          console.error(
            'command-status',
            'Error sending command: ' + err.message,
          );
          return 'Error sending command';
        }
      });
      return 'Waiting for response...';
    }
  });
};

// Creating new popup window
function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
    width: 600,
    height: 400,
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

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

ipcMain.handle('get-ports', async (event) => {
  const ports = await SerialPort.list();
  return ports.map((port) => ({
    path: port.path,
    manufacturer: port.manufacturer,
  }));
});

ipcMain.handle('get-uid', async (event) => {
  function getUID(responseBuffer: any) {
    // Check for DLE STX
    if (responseBuffer.slice(0, 2).toString('hex') !== '1002') {
      throw new Error('Invalid start of frame');
    }
    const data = responseBuffer.slice(11, -3);
    let uid;
    if (data.slice(0, 1).toString('hex') === '75') {
      uid = data.slice(7).toString();
    }
    return uid;
  }

  const ports = await SerialPort.list();
  const availablePorts = ports.map((port) => ({
    path: port.path,
    manufacturer: port.manufacturer,
  }));
  serialPort = new SerialPort({
    path: availablePorts[0].path,
    baudRate: 38400,
    autoOpen: false,
  });
  const path = availablePorts[0].path;
  console.log('avail port: ' + path);

  serialPort.open((err: any) => {
    if (err) {
      console.error('port-status', 'Error opening port: ' + err.message);
      return `Error opening port: ${err.message}`;
    }
    console.log('Port opened');
  });

  //send COmmand
  const command = [
    0x10, 0x02, 0x08, 0x00, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x01, 0x45,
    0x4d, 0x10, 0x03,
  ];
  const buffer = Buffer.from(command);
  if (serialPort && serialPort.isOpen) {
    serialPort.write(buffer, (err: any) => {
      console.log('sending command');
      if (err) {
        console.error(
          'command-status',
          'Error sending command: ' + err.message,
        );
        return 'Error sending command';
      }
    });
    console.log('Berhaisl Nirim COmand');
  }

  // if (serialPort && serialPort.isOpen) {
  //   serialPort.close((err: any) => {
  //     if (err) {
  //       console.log('Error closing port: ', err.message);
  //       // return `Error closing port: ${arg} closed`;
  //     }
  //     console.log('Port closed');
  //   });
  //   // return `Port ${arg} closed`;
  // } else {
  //   console.log('Tidak ada port yang tersambung');
  //   // return `No port connected`;
  // }
  let uid;
  serialPort.on('data', (data: any) => {
    // event.sender.send('serial-data', data.toString('hex'));
    uid = getUID(data);
    event.sender.send('serial-data', uid);
  });
  return uid;
});
