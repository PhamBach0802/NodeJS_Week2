const chalk = require('chalk');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

var date = new Date();
var curYear = date.getFullYear();

readline.question("What's your name? ", (name)=>{
    readline.question("What's your year of birth? ", (yob)=>{
        readline.question("What's your hometown? ", (homeTown)=>{
            console.log(`Thank you. Hello ${chalk.red(name)}, so you are ${chalk.blue(curYear - yob)} year old and form ${chalk.green(homeTown)}`);
            readline.close();
        });
    });
});