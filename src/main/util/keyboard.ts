const robotjs = require('robotjs');

export const controlF5 = () => {
    const sis = process.platform;

    if (sis == 'darwin') {
        robotjs.keyToggle('r', 'down', ['command', 'shift']);
        return;
    }

    robotjs.keyToggle('f5', 'down', 'control');
};

export const typeKeyboard = async (text: string) => {
    return robotjs.typeString(text);
};
