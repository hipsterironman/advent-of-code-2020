import { readFile } from 'fs';

readFile('./day6.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.split('\n\n');

    //part one
    const answer = lines.reduce((sum, line) => {
        const groupAnswers = new Set(line.replace(/\n/g, ''));
        return sum + groupAnswers.size;
    }, 0);

    //part two
    //basically: get array of possible questions answered; get each person's individual answers;
    //for each possible question answered, check if every person answered it
    const realAnswer = lines.reduce((sum, line) => {
        const groupAnswers = Array.from(new Set(line.replace(/\n/g, '')));
        const individualAnswers = line.split('\n');
        const universalAnswers = groupAnswers.reduce((groupSum, question) => {
            return (individualAnswers.every(answer => answer.includes(question))) ? groupSum + 1 : groupSum;
        }, 0);

        return sum + universalAnswers;
    }, 0);

    console.log(answer);
    console.log(realAnswer);
});
