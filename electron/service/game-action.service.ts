import { FindManyOptions } from 'typeorm';
import Database from '../database/Database';
import GameAction from '../database/models/game-action.model';

const getAll = (params?: FindManyOptions<GameAction>): Promise<GameAction[]> => {
    const repo = Database.getInstance().getRepository<GameAction>('GameAction');
    return repo.find(params);
};

const getLoop = (): Promise<GameAction[]> => {
    return getAll({ where: { loop: 1 } });
};
const getStart = (): Promise<GameAction[]> => {
    return getAll({ where: { loop: 0 } });
};

export default { getAll, getLoop, getStart };
