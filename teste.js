// const { spawn, exec } = require("child_process");
const { spawn, exec } = require("child_process");
const path = require("path");
const { PythonShell } = require("python-shell");
// console.log(`${path.join(__dirname, 'python', 'dist', 'teste', 'Python')} ${path.join(__dirname, 'python', 'scroll.py')}`)


const file = path.join(__dirname, 'assets', 'targets', 'connect-wallet.png')
const command = exec(`./python/bot-build/mac/bot findTarget 463 155 959 606 "${file}" 0.7`, (error, result, c) => {
    console.log(error)
    console.log((result))
});

