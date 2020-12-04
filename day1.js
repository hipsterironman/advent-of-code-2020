const fs = require('fs');

fs.readFile('./day1.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const transformed = data.split('\n').map(x => +x);

    for (let i = 0; i < transformed.length; i++) {
        for (let j = i + 1; j < transformed.length; j++) {
            for (let k = j + 1; k < transformed.length; k++) {
                if (transformed[i] + transformed[j] + transformed[k] === 2020) {
                    console.log(transformed[i]);
                    console.log(transformed[j]);
                    console.log(transformed[k]);
                    console.log(transformed[i] * transformed[j] * transformed[k]);
                    return transformed[i] * transformed[j] * transformed[k];
                }
            }
        }
    }
});

