import Account from '../../main/database/models/account.model';

const getName = (account: Account) => {
    return account.name || account.metamaskId;
};

export default { getName };
