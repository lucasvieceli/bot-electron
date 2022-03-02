import { app, BrowserWindow, nativeImage } from 'electron';
import path from 'path';
import 'reflect-metadata'; // Required by TypoORM.
import Database from './database/Database';
import { EventsService } from './service';
import { GameLoop } from './service/game-loop.service';
import { copyTargets } from './util/copy-targets';

declare global {
    namespace NodeJS {
        interface Global {
            document: Document;
            window: Window;
            navigator: Navigator;
            database: Database;
        }
    }
}

export const defaultStorageFolder = path.join(app.getPath('documents'), 'bot-bombcrypto');

export const isDev: boolean = !app.isPackaged;
export let win: BrowserWindow;
const database = Database.getInstance();

async function createWindow() {
    await copyTargets();
    await database.init();

    global.database = database;

    win = new BrowserWindow({
        width: 1280,
        height: 768,
        show: false,
        maximizable: true,
        autoHideMenuBar: !isDev,
        icon: nativeImage.createFromPath(path.join(__dirname, '..', '..', 'assets', 'images', 'bcoin.ico')),
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
    });

    win.maximize();
    win.on('close', () => close());

    if (isDev) {
        win.loadURL('http://localhost:8080');
    } else {
        win.loadFile('./dist-webpack/renderer/index.html');
    }

    win.webContents.on('did-finish-load', function () {
        win.show();
    });
}

async function registerListeners() {}
app.whenReady().then(EventsService.registerEvents).then(createWindow);

function close() {
    Database.getInstance().close();
    GameLoop.getInstance().stop();

    app.quit();
}

app.on('window-all-closed', () => close());

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
