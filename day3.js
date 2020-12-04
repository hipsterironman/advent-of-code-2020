const fs = require('fs');

fs.readFile('./day3.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    //need to go line by line
    const lines = data.split('\n');
    
    const r3d1 = traverse(lines, 3, 1);
    const r1d1 = traverse(lines, 1, 1);
    const r5d1 = traverse(lines, 5, 1);
    const r7d1 = traverse(lines, 7, 1);
    const r1d2 = traverse(lines, 1, 2);

    console.log('Answer: ' + (r1d1 * r3d1 * r5d1 * r7d1 * r1d2));
});

const traverse = (lines, right, down) => {
    let index = 0;

    return lines.reduce((result, line, currentIndex) => {
        if (currentIndex !== 0 && currentIndex % down === 0) {
            index += right;
            index %= line.length;
            if (line.charAt(index) === '#') {
                result++;
            }    
        }
        
        return result;
    }, 0);
}
