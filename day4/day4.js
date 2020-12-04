const fs = require('fs');

//field constants
const byr = 'byr';
const iyr = 'iyr';
const eyr = 'eyr';
const hgt = 'hgt';
const hcl = 'hcl';
const ecl = 'ecl';
const pid = 'pid';
const cid = 'cid';

//fields array (since cid is optional, it's excluded)
const fields = [byr, iyr, eyr, hgt, hcl, ecl, pid];

fs.readFile('./day4.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\n\n');
    const answer = lines.reduce((result, line) => {
        if (!fields.every(field => line.includes(field))) return result; //missing non-cid field means autofail
        const lineFields = line.split(/[\s\n]/);
        return lineFields.every(field => evalField(field)) ? result + 1 : result;
    }, 0);

    console.log(answer);
});

const evalField = (field) => {
    const [key, value] = field.split(':');

    switch(key) {
        case byr:
            return (Number(value) >= 1920 && Number(value) <= 2002);
        case iyr:
            return (Number(value) >= 2010 && Number(value) <= 2020);
        case eyr:
            return (Number(value) >= 2020 && Number(value) <= 2030);
        case hgt:
            let lower = 0;
            let upper = 0;
            let cleaned = '';

            if (value.includes('cm')) {
                lower = 150;
                upper = 193;
                cleaned = Number(value.replace('cm', ''));
            } else if (value.includes('in')) {
                lower = 59;
                upper = 76;
                cleaned = Number(value.replace('in', ''));
            } else {
                return false;
            }

            return cleaned >= lower && cleaned <= upper;
        case hcl:
            return /#[\da-f]{6}/.test(value);
        case ecl:
            const colors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
            return colors.some(color => value === color);
        case pid:
            return value.length === 9;
        case cid:
            return true;
        default:
            return false;
    }
}