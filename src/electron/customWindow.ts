import { app, BrowserWindow, BrowserView, ipcMain } from "electron";
import path from "path";
import EventEmitter from "events";
import IPC from "./IPC/General/IPC";

const appName = "electron-browser-view";

const defaultSettings = {
  title: "electron-browser-view",
  width: 854,
  height: 480,
  frame: false,
  backgroundColor: "#FFF",
};

class CustomWindow {
  window!: BrowserWindow;
  settings: { [key: string]: any };
  onEvent: EventEmitter = new EventEmitter();

  browserView!: BrowserView;

  constructor(settings: { [key: string]: any } | null = null) {
    this.settings = settings
      ? { ...defaultSettings, ...settings }
      : { ...defaultSettings };
  }

  createWindow(url: string) {
    let settings = { ...this.settings };
    app.name = appName;
    let window = new BrowserWindow({
      ...settings,
      show: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        nativeWindowOpen: true,
        preload: path.join(__dirname, "preload.js"),
      },
    });

    window.loadURL(url);
    window.once("ready-to-show", () => {
      window.show();
    });

    this.window = window;
    return window;
  }

  async setIpcMain(api: Array<IPC>) {
    api.forEach(async (el) => await el.initIpcMain(ipcMain, this.window));
  }

  async addBrowserView(link: string) {
    const [width, height] = this.window.getSize();

    this.browserView = new BrowserView({
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        nativeWindowOpen: true,
        preload: path.join(__dirname, "preload.js"),
      },
    });

    this.window.setBrowserView(this.browserView);
    this.browserView.setBounds({
      x: 1,
      y: 32,
      width: width - 2,
      height: height - 33,
    });
    this.browserView.setAutoResize({
      width: true,
      height: true,
    });
    this.browserView.webContents.loadURL(link);
  }

  async setIpcMainView(api: Array<IPC>) {
    api.forEach(async (el) => await el.initIpcMain(ipcMain, this.browserView));
  }
}

export default CustomWindow;
