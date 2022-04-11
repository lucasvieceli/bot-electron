import { globalShortcut } from 'electron';
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
    EVENT_BCOIN_TOTAL_YESTERDAY, EVENT_CONFIG_GET, EVENT_CONFIG_GET_SYSTEM,
    EVENT_CONFIG_UPDATE,
    EVENT_CONFIG_UPDATE_COLUMN, EVENT_GAME_LOOP_CONTINUE,
    EVENT_GAME_LOOP_PAUSE,
    EVENT_GAME_LOOP_START, EVENT_GAME_LOOP_STOP,
    EVENT_LOG_LIST,
    EVENT_MAP_AVERAGE_LAST_WEEK,
    EVENT_MAP_LIST,
    EVENT_MAP_TOTAL
} from '../../variables';
import Config from '../database/models/config.model';
import { AccountCreate } from '../dto/account-create';
import { contextBridge } from '../main';
import accountService from './account.service';
import { AccountChange } from './account.types';
import bcoinService from './bcoin.service';
import configService from './config.service';
import { UpdateColumnParams } from './config.types';
import { GameLoop } from './game-api/game-loop.class';
import logService from './log.service';
import mapService from './map.service';

const registerEvents = async () => {

    
    // ipcMain.on(EVENT_GAME_LOOP_STATUS, (data) => contextBridge.broadcastMessage(EVENT_GAME_LOOP_STATUS, {data}));
    // // ipcMain.on(EVENT_GAME_LOOP_STATUS, (value) => win.webContents.send(EVENT_GAME_LOOP_STATUS, value));
    // ipcMain.on(EVENT_GAME_LOOP_STATUS_PAUSED, (value) => win.webContents.send(EVENT_GAME_LOOP_STATUS_PAUSED, value));
    // ipcMain.on(EVENT_GAME_LOOP_BROWSER, (value) => win.webContents.send(EVENT_GAME_LOOP_BROWSER, value));
    contextBridge.createIpcChannel(EVENT_GAME_LOOP_START, () => GameLoop.getInstance().start());
    contextBridge.createIpcChannel(EVENT_GAME_LOOP_STOP, () => GameLoop.getInstance().stop());
    contextBridge.createIpcChannel(EVENT_GAME_LOOP_CONTINUE, () => GameLoop.getInstance().continue());
    contextBridge.createIpcChannel(EVENT_GAME_LOOP_PAUSE, () => GameLoop.getInstance().pause());

    contextBridge.createIpcChannel(EVENT_BCOIN_LIST, bcoinService.pagination);
    contextBridge.createIpcChannel(EVENT_BCOIN_TOTAL,bcoinService.getTotalBcoin);
    contextBridge.createIpcChannel(EVENT_MAP_LIST, mapService.pagination);
    contextBridge.createIpcChannel(EVENT_MAP_TOTAL, mapService.getTotalMaps);
    contextBridge.createIpcChannel(EVENT_LOG_LIST,logService.pagination);
    contextBridge.createIpcChannel(EVENT_MAP_AVERAGE_LAST_WEEK, mapService.getAverageMapsLastWeek);
    contextBridge.createIpcChannel(EVENT_BCOIN_TOTAL_YESTERDAY, bcoinService.getTotalBcoinYesterday);
    contextBridge.createIpcChannel(EVENT_BCOIN_AVERAGE_LAST_WEEK, bcoinService.getAverageBcoinLastWeek);
    contextBridge.createIpcChannel(EVENT_ACCOUNT_LIST, accountService.pagination);
    contextBridge.createIpcChannel(EVENT_ACCOUNT_CHANGE_NAME, accountService.changeName);
    contextBridge.createIpcChannel(EVENT_CONFIG_GET, configService.getConfig);
    contextBridge.createIpcChannel(EVENT_CONFIG_GET_SYSTEM, async ()=>{
        return await formatResultEvent(configService.getConfigSystem())
    });
    contextBridge.createIpcChannel(EVENT_CONFIG_UPDATE, async (params: Config)=>{
        return await formatResultEvent(configService.update(params))
    });
    contextBridge.createIpcChannel(EVENT_CONFIG_UPDATE_COLUMN, async (params: UpdateColumnParams)=>{
        return await formatResultEvent(configService.updateColumn(params))
    });
    contextBridge.createIpcChannel(
        EVENT_ACCOUNT_CHANGE,
        async (params: AccountChange) => await formatResultEvent(accountService.change(params)),
    );
    contextBridge.createIpcChannel(
        EVENT_ACCOUNT_CREATE,
        async (params: AccountCreate) => await formatResultEvent(accountService.create(params)),
    );
    contextBridge.createIpcChannel(EVENT_ACCOUNT_INFO, accountService.getById);
    contextBridge.createIpcChannel(EVENT_ACCOUNT_DELETE, accountService.remove);

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
