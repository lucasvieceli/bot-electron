import { ipcMain, IpcMainEvent } from 'electron';
import { win } from '..';
import accountService from './account.service';
import { AccountChangeName } from './account.types';
import bcoinService from './bcoin.service';
import {
    EVENT_BCOIN_LIST,
    EVENT_BCOIN_TOTAL,
    EVENT_GAME_LOOP_START,
    EVENT_GAME_LOOP_STATUS,
    EVENT_GAME_LOOP_STOP,
    EVENT_MAP_LIST,
    EVENT_MAP_TOTAL,
    EVENT_LOG_LIST,
    EVENT_MAP_AVERAGE_LAST_WEEK,
    EVENT_BCOIN_TOTAL_YESTERDAY,
    EVENT_BCOIN_AVERAGE_LAST_WEEK,
    EVENT_ACCOUNT_LIST,
    EVENT_ACCOUNT_CHANGE_NAME,
} from './events.types';
import { GameLoop } from './game-loop.service';
import logService from './log.service';
import mapService from './map.service';

const registerEvents = async () => {
    ipcMain.on(EVENT_GAME_LOOP_STATUS, (value) => win.webContents.send(EVENT_GAME_LOOP_STATUS, value));
    ipcMain.on(EVENT_GAME_LOOP_START, () => GameLoop.getInstance().start());
    ipcMain.on(EVENT_GAME_LOOP_STOP, () => GameLoop.getInstance().stop());
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
};
export default { registerEvents };
