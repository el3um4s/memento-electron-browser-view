import { BrowserWindow, BrowserView, IpcMain } from "electron";
import { APIChannels, SendChannels } from "./channelsInterface";

import { toTryAsync } from "@el3um4s/to-try";

const catchError = (e: any) => {
  if (e! instanceof TypeError) console.log(e);
};

export default class IPC {
  nameAPI: string = "api";
  validSendChannel: SendChannels = {};
  validReceiveChannel: string[] = [];

  constructor(channels: APIChannels) {
    this.nameAPI = channels.nameAPI;
    this.validSendChannel = channels.validSendChannel;
    this.validReceiveChannel = channels.validReceiveChannel;
  }

  get channels(): APIChannels {
    return {
      nameAPI: this.nameAPI,
      validSendChannel: this.validSendChannel,
      validReceiveChannel: this.validReceiveChannel,
    };
  }

  async initIpcMain(
    ipcMain: IpcMain,
    customWindow: BrowserWindow | BrowserView
  ) {
    if (customWindow) {
      Object.keys(this.validSendChannel).forEach((key) => {
        ipcMain.on(key, async (event, message) => {
          try {
            if (
              !!customWindow &&
              customWindow.webContents.id === event.sender.id
            ) {
              await this.validSendChannel[key](customWindow, event, message);
            }
          } catch (e) {
            if (e instanceof TypeError) {
              // console.log(e.name, e.message);
            } else {
              console.log(e);
            }
          }
        });
      });
    }
  }
}
