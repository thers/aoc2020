// Day 2

// Part 1
(() => {
    var correctPasswords = document.body.innerText.split('\n')
        .filter(Boolean)
        .map(p => p.split(': '))
        .filter(([policy, pwd]) => {
            const [repeats, letter] = policy.split(' ');
            const [min, max] = repeats.split('-').map(i=>parseInt(i));

            const spread = pwd.split('').reduce((acc, l) => { acc[l] = 1 + (acc[l] || 0); return acc }, {});
            const letterFreq = spread[letter] || 0;

            return letterFreq >= min && letterFreq <= max;
        });

    console.log('Amount of correct answers:', correctPasswords.length, correctPasswords);
})();

// Part 2
(() => {
    var correctPasswords = document.body.innerText.split('\n')
        .filter(Boolean)
        .map(p => p.split(': '))
        .filter(([policy, pwd]) => {
            const [repeats, letter] = policy.split(' ');
            const [i1, i2] = repeats.split('-').map(i=>parseInt(i));

            const i1c = (pwd[i1 - 1] === letter)|0;
            const i2c = (pwd[i2 - 1] === letter)|0;

            return i1c + i2c === 1;
        });

    console.log('Amount of correct answers:', correctPasswords.length, correctPasswords);
})();
