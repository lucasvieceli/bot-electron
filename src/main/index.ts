import { app, BrowserWindow, Menu } from 'electron';
import 'reflect-metadata'; // Required by TypoORM.
import Database from './database/Database';

export const defaultStorageFolder = app.getPath('documents');

const isDev: boolean = !app.isPackaged;
const database = new Database();
export let win: BrowserWindow;

async function createWindow() {
    await database.init();

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

    global.database = database;

    if (isDev) {
        win.loadURL('http://localhost:8080');
        win.webContents.openDevTools();
    } else {
        win.loadFile('./dist-webpack/renderer/index.html');
        // win.loadURL(`file://${path.join(__dirname, '../../.webpack/renderer/index.html')}`);
    }
    win.show();
}

async function registerListeners() {
    // ipcMain.on('printScreen', async (e, message) => {
    //   console.log(message, 'printscreen')
    //   const print = await printScreen()
    //   e.returnValue = print
    // })
    const { PythonShell } = require('python-shell');
    let options: any = {
        mode: 'text',
        pythonOptions: ['-u'],
        args: ['waldo'],
        // pythonPath: './python-3.10/python.exe',
    };
    setTimeout(async () => {
        console.log('foi');
        let pyshell: any = PythonShell.run('python/positions.py', options, (r: string) => {
            console.log(r);
        });
        console.log(await PythonShell.getVersion());
        pyshell.on('message', function (message: string) {
            console.log(message, 'uashduashdipuasdhuasdhuasd');
        });
    }, 3000);
}
app.whenReady().then(registerListeners).then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
    database.close();
    //app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
