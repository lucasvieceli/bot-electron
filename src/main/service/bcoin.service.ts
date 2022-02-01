import Database from '../database/Database';
import Account from '../database/models/account.model';
import Bcoin from '../database/models/bcoin.model';

const addBcoinAccount = async (account: Account, bcoin: number) => {
    const repo = await Database.getInstance().getRepository<Bcoin>('Bcoin');

    const create = repo.create({
        qty: bcoin,
        account,
    });

    await repo.save(create);
    return create;
};

export default { addBcoinAccount };
