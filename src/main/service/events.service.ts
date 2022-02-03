import { ipcMain, IpcMainEvent } from 'electron';
import { win } from '..';
import bcoinService from './bcoin.service';
import {
    EVENT_BCOIN_LIST,
    EVENT_BCOIN_TOTAL,
    EVENT_GAME_LOOP_START,
    EVENT_GAME_LOOP_STATUS,
    EVENT_GAME_LOOP_STOP,
} from './events.types';
import { GameLoop } from './game-loop.service';

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
};
export default { registerEvents };
