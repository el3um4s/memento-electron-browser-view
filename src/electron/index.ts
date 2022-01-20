import { app } from "electron";
import { autoUpdater } from "electron-updater";
import path from "path";
import CustomWindow from "./customWindow";
// import { view } from "./customBrowserView";

import systemInfo from "./IPC/systemInfo";
import updaterInfo from "./IPC/updaterInfo";
import windowControls from "./IPC/windowControls";
import windowManager from "./IPC/windowManager";

import * as globals from "./globals";

globals.set.mainURL(path.join(__dirname, "www", "index.html"));

require("electron-reload")(__dirname);

let mainWindow: CustomWindow;

// app.commandLine.appendSwitch("disable-gpu");
// app.commandLine.appendArgument("disable-gpu");

app.on("ready", async () => {
  await createMainWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

async function createMainWindow() {
  const settings = {
    title: "MEMENTO - Electron BrowserView",
  };
  mainWindow = new CustomWindow(settings);
  const urlPage = globals.get.mainUrl() + "#main";
  mainWindow.createWindow(urlPage);

  await mainWindow.setIpcMain([
    systemInfo,
    updaterInfo,
    windowControls,
    windowManager,
  ]);

  updaterInfo.initAutoUpdater(autoUpdater, mainWindow.window);
}
