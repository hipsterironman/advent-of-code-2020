import { readFile } from 'fs';

const MY_BAG = 'shinygoldbag';

readFile('day7.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\n');
    let bags = {};
    lines.forEach(line => {
        const bagContains = line.match(/((?:\d\s)?\w+\s\w+) bag/g).map(curr => curr.replace(/\s/g, '')).filter(curr => curr !== 'nootherbag');
        bags[bagContains[0]] = bagContains.slice(1);
    });

    //part one
    // let sum = 0;
    // for (const color in bags) {
    //     sum += openBag(color, bags);
    // }
    // console.log(sum - 1);

    //part two
    console.log(countBags(MY_BAG, bags) - 1);
});

const openBag = (color, bags) => {
    if (color === MY_BAG) return 1;
    if (bags[color] === undefined) return 0;

    return bags[color].some(curr => openBag(curr, bags) === 1) ? 1 : 0;
}

const countBags = (color, bags) => {
    let sum = 1;

    bags[color].forEach(curr => {
        sum += parseInt(curr) * countBags(curr.split(/\d/)[1], bags);
    });

    return sum;
}
