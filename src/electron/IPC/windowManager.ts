import { SendChannels } from "./General/channelsInterface";
import IPC from "./General/IPC";
import { BrowserWindow } from "electron";

import CustomWindow from "../customWindow";
import path from "path";

import windowControls from "./windowControls";

const nameAPI = "windowManager";

// to Main
const validSendChannel: SendChannels = {
  openInNewWindow: openInNewWindow,
};

// from Main
const validReceiveChannel: string[] = [];

const windowManager = new IPC({
  nameAPI,
  validSendChannel,
  validReceiveChannel,
});

export default windowManager;

// Enter here the functions for ElectronJS

async function openInNewWindow(
  mainWindow: BrowserWindow,
  event: Electron.IpcMainEvent,
  message: any
) {
  console.log(message);
  await createMainWindow(message.link);
}

async function createMainWindow(destination: string) {
  let customWindow: CustomWindow;
  const settings = {
    title: "MEMENTO - Svelte, Tailwind, Electron & TypeScript",
  };
  customWindow = new CustomWindow(settings);
  const urlPage = destination;
  customWindow.createWindow(urlPage);

  await customWindow.setIpcMain([windowControls]);
  return customWindow;
}
