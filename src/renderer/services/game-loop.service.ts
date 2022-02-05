import { remote } from 'electron';
import { GameLoop } from '../../main/service/game-loop.service';
const gameLoop = remote.getGlobal('gameLoop') as GameLoop;

const start = () => {};
const stop = () => {};

export default { start, stop };
