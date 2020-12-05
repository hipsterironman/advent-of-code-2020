import { readFile } from 'fs';

readFile('./day5.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\n');
    let ids = [];
    const answer = lines.reduce((max, line) => {
        const binary = line.replace(/[FL]/g, '0').replace(/[BR]/g, '1');
        const row = parseInt(binary.substring(0, 7), 2);
        const seat = parseInt(binary.substring(7, 10), 2);

        const id = (row * 8) + seat;
        ids.push(id);

        return id > max ? id : max;
    }, 0);
    console.log(`Highest seat id: ${answer}`);

    const sortedIds = ids.sort((a, b) => a - b);
    let index = sortedIds[0];
    for (const currId of sortedIds) {
        if (index !== currId) {
            console.log(`Your seat id: ${index}`);
            return;
        }
        
        index++;
    }
});
