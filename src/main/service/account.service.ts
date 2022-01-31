import Database from '../database/Database';
import Account from '../database/models/account.model';

const findByMetamaskIdOrCreate = async (metamaskId: string): Promise<Account> => {
    const repo = Database.getInstance().getRepository<Account>('Account');

    const exists = await repo.findOne({
        where: {
            metamaskId,
        },
    });

    if (exists) return exists;

    const create = repo.create({ metamaskId });
    await repo.save(create);

    return create;
};

export default { findByMetamaskIdOrCreate };
