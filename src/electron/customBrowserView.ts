import { BrowserView } from "electron";
import path from "path";

export const view = new BrowserView({
  webPreferences: {
    preload: path.join(__dirname, "preload.js"), // needs full path
  },
});
