import { app, BrowserWindow, Menu, nativeImage } from 'electron';
import path from 'path';
import 'reflect-metadata'; // Required by TypoORM.
import Database from './database/Database';
import { EventsService } from './service';
import { GameLoop } from './service/game-loop.service';
import { copyTargets } from './util/copy-targets';
import { createWindowBomb } from './util/window';
require('./util/opencv');
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

const isDev: boolean = !app.isPackaged;
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
        autoHideMenuBar: !isDev,
        icon: nativeImage.createFromPath(path.join(__dirname, '..', '..', 'assets', 'images', 'bcoin.ico')),
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
    });

    win.on('close', () => {
        Database.getInstance().close();
        GameLoop.getInstance().stop();
        app.quit();
    });

    win.maximize();

    if (!isDev) {
        Menu.setApplicationMenu(Menu.buildFromTemplate([{ label: 'teste' }]));
    }

    if (isDev) {
        win.loadURL('http://localhost:8080');
        // win.webContents.openDevTools();
    } else {
        win.loadFile('./dist-webpack/renderer/index.html');
    }

    win.webContents.on('did-finish-load', function () {
        win.show();
    });
}

async function registerListeners() {}
app.whenReady().then(EventsService.registerEvents).then(createWindow);

app.on('window-all-closed', () => {
    Database.getInstance().close();
    GameLoop.getInstance().stop();
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
