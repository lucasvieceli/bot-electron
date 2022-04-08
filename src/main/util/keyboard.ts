// const robotjs = require('robotjs');

import { Key, keyboard } from "@nut-tree/nut-js";

export const controlF5 = async () => {
    const sis = process.platform;

    if (sis == 'darwin') {
        // robotjs.keyToggle('r', 'down', ['command', 'shift']);
        await keyboard.pressKey(Key.R, Key.Comma, Key.LeftShift);
        return;
    }

    // robotjs.keyToggle('f5', 'down', 'control');
};

export const typeKeyboard = async (text: string) => {
    // return robotjs.typeString(text);
    return keyboard.type(text);
};
