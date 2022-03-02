import { globalShortcut, ipcMain, IpcMainEvent, IpcMainInvokeEvent } from 'electron';
import { win } from '..';
import { AccountCreate } from '../dto/account-create';
import accountService from './account.service';
import { AccountChange, AccountChangeName } from './account.types';
import bcoinService from './bcoin.service';
import {
    EVENT_ACCOUNT_CHANGE,
    EVENT_ACCOUNT_CHANGE_NAME,
    EVENT_ACCOUNT_CREATE,
    EVENT_ACCOUNT_DELETE,
    EVENT_ACCOUNT_INFO,
    EVENT_ACCOUNT_LIST,
    EVENT_BCOIN_AVERAGE_LAST_WEEK,
    EVENT_BCOIN_LIST,
    EVENT_BCOIN_TOTAL,
    EVENT_BCOIN_TOTAL_YESTERDAY,
    EVENT_GAME_LOOP_BROWSER,
    EVENT_GAME_LOOP_CONTINUE,
    EVENT_GAME_LOOP_PAUSE,
    EVENT_GAME_LOOP_START,
    EVENT_GAME_LOOP_STATUS,
    EVENT_GAME_LOOP_STATUS_PAUSED,
    EVENT_GAME_LOOP_STOP,
    EVENT_LOG_LIST,
    EVENT_MAP_AVERAGE_LAST_WEEK,
    EVENT_MAP_LIST,
    EVENT_MAP_TOTAL,
} from './events.types';
import { GameLoop } from './game-api/game-loop.class';
import logService from './log.service';
import mapService from './map.service';

const registerEvents = async () => {
    ipcMain.on(EVENT_GAME_LOOP_STATUS, (value) => win.webContents.send(EVENT_GAME_LOOP_STATUS, value));
    ipcMain.on(EVENT_GAME_LOOP_STATUS_PAUSED, (value) => win.webContents.send(EVENT_GAME_LOOP_STATUS_PAUSED, value));
    ipcMain.on(EVENT_GAME_LOOP_BROWSER, (value) => win.webContents.send(EVENT_GAME_LOOP_BROWSER, value));
    ipcMain.on(EVENT_GAME_LOOP_START, () => GameLoop.getInstance().start());
    ipcMain.on(EVENT_GAME_LOOP_STOP, () => GameLoop.getInstance().stop());
    ipcMain.on(EVENT_GAME_LOOP_CONTINUE, () => GameLoop.getInstance().continue());
    ipcMain.on(EVENT_GAME_LOOP_PAUSE, () => GameLoop.getInstance().pause());

    ipcMain.on(EVENT_BCOIN_LIST, async (e: IpcMainEvent, params) => {
        e.returnValue = await bcoinService.pagination(params);
    });
    ipcMain.on(EVENT_BCOIN_TOTAL, async (e: IpcMainEvent, params) => {
        e.returnValue = await bcoinService.getTotalBcoin(params);
    });
    ipcMain.on(EVENT_MAP_LIST, async (e: IpcMainEvent, params) => {
        e.returnValue = await mapService.pagination(params);
    });
    ipcMain.on(EVENT_MAP_TOTAL, async (e: IpcMainEvent, params) => {
        e.returnValue = await mapService.getTotalMaps(params);
    });
    ipcMain.on(EVENT_LOG_LIST, async (e: IpcMainEvent, params) => {
        e.returnValue = await logService.pagination(params);
    });
    ipcMain.on(EVENT_MAP_AVERAGE_LAST_WEEK, async (e: IpcMainEvent, params) => {
        e.returnValue = await mapService.getAverageMapsLastWeek();
    });
    ipcMain.on(EVENT_BCOIN_TOTAL_YESTERDAY, async (e: IpcMainEvent, params) => {
        e.returnValue = await bcoinService.getTotalBcoinYesterday();
    });
    ipcMain.on(EVENT_BCOIN_AVERAGE_LAST_WEEK, async (e: IpcMainEvent, params) => {
        e.returnValue = await bcoinService.getAverageBcoinLastWeek();
    });
    ipcMain.on(EVENT_ACCOUNT_LIST, async (e: IpcMainEvent, params) => {
        e.returnValue = await accountService.pagination(params);
    });
    ipcMain.on(EVENT_ACCOUNT_CHANGE_NAME, async (e: IpcMainEvent, params: AccountChangeName) => {
        e.returnValue = await accountService.changeName(params);
    });
    ipcMain.handle(
        EVENT_ACCOUNT_CHANGE,
        async (e: IpcMainInvokeEvent, params: AccountChange) => await formatResultEvent(accountService.change(params)),
    );
    ipcMain.handle(
        EVENT_ACCOUNT_CREATE,
        async (e: IpcMainInvokeEvent, params: AccountCreate) => await formatResultEvent(accountService.create(params)),
    );
    ipcMain.on(EVENT_ACCOUNT_INFO, async (e: IpcMainEvent, params: number) => {
        e.returnValue = await accountService.getById(params);
    });
    ipcMain.on(EVENT_ACCOUNT_DELETE, async (e: IpcMainEvent, params: number | string) => {
        e.returnValue = await accountService.remove(params);
    });

    globalShortcut.register('Shift+F1', () => {
        const game = GameLoop.getInstance();
        if (game.execute) {
            game.stop();
            return;
        }

        game.start();
    });
    globalShortcut.register('Shift+F2', () => {
        const game = GameLoop.getInstance();

        if (game.isPaused === null) {
            return false;
        }

        if (game.isPaused) {
            game.continue();
            return;
        }

        game.pause();
    });
};

const formatResultEvent = async (promise: Promise<unknown>) => {
    try {
        return {
            status: 'success',
            data: await promise,
        };
    } catch (e) {
        return {
            status: 'error',
            data: e,
        };
    }
};
export default { registerEvents };
