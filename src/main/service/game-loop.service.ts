import Config from '../database/models/config.model';
import configService from './config.service';
import { WindowsConfig } from './game-loop.types';
import logService from './log.service';

export class GameLoop {
    static instance: GameLoop;
    public config: Config;
    public windows: WindowsConfig[];
    windowName = 'Bombcrypto';

    constructor() {}

    static getInstance() {
        if (GameLoop.instance) return GameLoop.instance;

        GameLoop.instance = new GameLoop();
        return GameLoop.instance;
    }

    async start() {
        await logService.registerLog('Buscando configurações');
        await logService.registerLog('Encontrado {{qty}} janela(s) com nome de {{nameWindow}}', {
            nameWindow: this.windowName,
            qty: '2',
        });
    }

    private getBrowsers() {}
    private async getConfig() {
        this.config = await configService.getConfig();
    }
}
