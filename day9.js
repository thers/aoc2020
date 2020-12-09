// Day 9

(() => {
    const bigIntSorter = (a, b) => parseInt(a - b);
    const checkSum = (num, set) => set.some((a, ai) => set.filter((x, bi) => bi !== ai).some(b => a + b === num));
    const arraySum = (arr) => arr.reduce((acc, x) => acc + x, 0);

    const arraySumUntil = (arr, end) => {
        let acc = 0;

        for (let i = 0; i <= end; i++) {
            acc += arr[i];
        }

        return acc;
    };

    const part1 = (stream, preamble) => stream.slice(preamble)
        .find((num, idx) => !checkSum(
            num,
            stream
                .slice(idx, idx + preamble)
                .sort(bigIntSorter)
                .filter(x => x <= num),
        ));

    const part2 = (stream, p1) => {
        const set = stream.slice(0, stream.findIndex(x => x >= p1));

        while (arraySum(set) !== p1 && set.length) {
            const endIdx = set.findIndex((x, i) => p1 === arraySumUntil(set, i));

            if (endIdx === -1) {
                set.shift();
                continue;
            }

            return set.slice(0, endIdx + 1).sort(bigIntSorter);
        }
    }

    const input = document.body.innerText;
    const preamble = 25;

    const stream = input.trim().split('\n').map(x => parseInt(x));

    const p1 = part1(stream, preamble);
    const p2 = part2(stream, p1);

    console.log('Part 1:', p1);
    console.log('Part 2:', p2[0] + p2[p2.length - 1]);
})();
