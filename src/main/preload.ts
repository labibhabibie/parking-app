// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

type Channels =
  | 'open-port'
  | 'send-command'
  | 'close-port'
  | 'list-ports'
  | 'ports-list'
  | 'serial-data'
  | 'port-status'
  | 'command-status';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      // Return a cleanup function to unsubscribe
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
    receive(
      channel: Channels,
      func: (event: IpcRendererEvent, ...args: unknown[]) => void,
    ) {
      ipcRenderer.on(channel, func);
    },
    removeAllListeners(channel: Channels) {
      ipcRenderer.removeAllListeners(channel);
    },
  },
  getPorts: () => ipcRenderer.invoke('get-ports'),
  getUID: () => ipcRenderer.invoke('get-uid'),
  openPort: (config: any) => ipcRenderer.invoke('open-port', config),
  closePort: (portName: any) =>
    ipcRenderer.invoke('close-serial-port', portName),
  sendCommand: (command: []) => ipcRenderer.invoke('send-command', command),

  onData: (func: any) => {
    ipcRenderer.on('serial-data', (event, data) => func(data));
  },
  removeDataListener: (func: any) => {
    ipcRenderer.removeListener('serial-data', (event, data) => func(data));
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
