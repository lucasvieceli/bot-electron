// const teste = require('child_process')

// teste.exec(`osascript ./teste3.applescript`, (error, stdout, stderr) => {
//     if (error) {
//         console.error(`error: ${error.message}`);
//         return;
//     }

//     if (stderr) {
//         console.error(`stderr: ${stderr}`);
//         return;
//     }

//     console.log(`stdout:\n${stdout}`);
// });

const winctl = require('winctl');

winctl.FindByTitle("Bombcrypto").then(window => {
    console.log("Title of window with title 'alc':", window.getTitle());
    // --> Title of window with title 'alc': Calculator

    // Activate the window
    window.setForegroundWindow();
});