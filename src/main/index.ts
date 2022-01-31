import 'reflect-metadata'; // Required by TypoORM.
import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import Database from './database/Database';
import { GameLoop } from './service/game-loop.service';
import { copyTargets } from './util/copy-targets';
require('./util/opencv');

export const defaultStorageFolder = path.join(app.getPath('documents'), 'bot-bombcrypto');

const isDev: boolean = !app.isPackaged;
export let win: BrowserWindow;
const database = Database.getInstance();

async function createWindow() {
    await copyTargets();
    await database.init();

    global.database = database;

    win = new BrowserWindow({
        width: 1920,
        height: 1080,
        show: false,
        autoHideMenuBar: true,
        icon: 'assets/images/bcoin.ico',
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
    });
    win.maximize();

    Menu.setApplicationMenu(Menu.buildFromTemplate([{ label: 'teste' }]));

    if (isDev) {
        win.loadURL('http://localhost:8080');
        win.webContents.openDevTools();
    } else {
        win.loadFile('./dist-webpack/renderer/index.html');
        // win.loadURL(`file://${path.join(__dirname, '../../.webpack/renderer/index.html')}`);
    }

    win.show();

    setTimeout(async () => {
        const game = GameLoop.getInstance();
        game.start();
    }, 3000);
}

async function registerListeners() {
    // ipcMain.on('printScreen', async (e, message) => {
    //   console.log(message, 'printscreen')
    //   const print = await printScreen()
    //   e.returnValue = print
    // })
}
app.whenReady().then(registerListeners).then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // if (process.platform !== 'darwin') {
    //     app.quit();
    // }
    Database.getInstance().close();
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
