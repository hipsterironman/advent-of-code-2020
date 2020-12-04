const fs = require('fs');

fs.readFile('./day2ex.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    //need to go line by line
    const lines = data.split('\n');
    let valid = 0;
    let posValid = 0;
    
    lines.forEach((line) => {
        const pieces = line.split(' ');
        const limits = pieces[0].split('-').map(x => +x);
        const lower = limits[0];
        const upper = limits[1];
        const letter = pieces[1].charAt(0);
        const password = pieces[2].split('\n')[0];
        const test = password.split(letter).length - 1;
        
        if (test >= lower && test <= upper) {
            valid++;
        }

        const firstPos = password.charAt(lower - 1) === letter;
        const secondPos = password.charAt(upper - 1) === letter;

        if ((firstPos && !secondPos) || (!firstPos && secondPos)) {
            posValid++;
        }
    });

    console.log('Part 1: ' + valid); //should be 536
    console.log('Part 2: ' + posValid);
});

