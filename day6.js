// Day 6

(() => {
    const answers = document.body.innerText;

    const sum = (acc, n) => acc + n;

    const part1 = (input) => input.trim().split('\n\n')
        .map(group => new Set(group.replace(/\n/g, '').split('')).size)
        .reduce(sum, 0);

    const part2 = (input) => input.trim().split('\n\n')
        .map(group => group.split('\n').map(person => person.trim().split('')))
        .map(group => [
            group.length,
            group.reduce((acc, ansrs) => { ansrs.forEach(a => acc[a] = (acc[a]|0) + 1); return acc }, {}),
        ])
        .map(([groupSize, answersCounts]) => Object.values(answersCounts).reduce((acc, answersCount) => acc + (answersCount === groupSize)|0, 0))
        .reduce(sum, 0);
    
    console.log('Part 1 answer:', part1(answers));
    console.log('Part 2 answer:', part2(answers));
})();
