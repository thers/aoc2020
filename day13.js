// Day 13
// Only solved by myself part 1, d-uh,
// Part 2 is basically Chinese Remainder theorem as per reddit solutions megathread.

(() => {
    Array.prototype.inspect = function (m) {
        console.log(m, this);
        return this;
    }

    const parseInput = (input) => {
        const [tss, bids] = input.trim().split('\n');

        return {
            tss: parseInt(tss),
            bids: bids.split(',').map(bid => bid === 'x' ? 'x' : parseInt(bid)),
        };
    };

    const part1 = ({ tss, bids }) => bids.filter(bid => bid !== 'x').map(bid => [bid, bid-tss%bid]).inspect('remainings').sort((a, b) => a[1] - b[1])[0].reduce((acc, n) => acc*n, 1);

    const input = document.body.innerText;

    const parsedInput = parseInput(input);

    console.log('Part 1:', part1(parsedInput));
})();
