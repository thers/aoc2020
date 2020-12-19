// Day 12

(() => {
    const re = /(?<op>(N|S|E|W|L|R|F))(?<num>[0-9]+)/;

    const dirs = {
        N: 0,
        E: 1,
        S: 2,
        W: 3,
    };

    const dirDiffs = [
        [0, 1], // N
        [1, 0],  // E
        [0, -1],  // S
        [-1, 0], // W
    ];

    const rotate = (x, y, angle) => {
        const s = Math.sin(-angle*Math.PI/180);
        const c = Math.cos(-angle*Math.PI/180);

        return [Math.round(x*c - y*s), Math.round(y*c + x*s)];
    }

    const parseInstructions = (input) => input
        .trim()
        .split('\n')
        .map(r => r.match(re).groups)
        .map(r => ({ ...r, num: parseInt(r.num, 10) }))
        .map(r => (r.op==='L' || r.op==='R') ? { ...r, num: (r.num/90)%4 } : r); // translate turn ops degrees to sides

    const part1 = (instructions) => {
        let x = 0;
        let y = 0;
        let d = dirs.E;

        instructions.forEach(({ op, num }) => {
            switch (op) {
                case 'N':
                case 'E':
                case 'S':
                case 'W': {
                    const [dx, dy] = dirDiffs[dirs[op]];
                    x += dx*num;
                    y += dy*num;
                    break;
                }

                case 'L':
                case 'R': {
                    const m = op === 'L' ? -1 : 1;
                    d = (4 + (d + num*m)) % 4; // always stay in 0-3 bounds
                    break;
                }

                case 'F': {
                    const [dx, dy] = dirDiffs[d];
                    x += dx*num;
                    y += dy*num;
                    break;
                }
            }
        });

        return Math.abs(x) + Math.abs(y);
    };

    const part2 = (instructions) => {
        let x = 0;
        let y = 0;
        
        let wx = 10;
        let wy = 1;

        instructions.forEach(({ op, num }) => {
            switch (op) {
                case 'N':
                case 'E':
                case 'S':
                case 'W': {
                    const [dx, dy] = dirDiffs[dirs[op]];
                    wx += dx*num;
                    wy += dy*num;
                    break;
                }

                case 'L':
                case 'R': {
                    const m = op === 'L' ? -1 : 1;

                    [wx, wy] = rotate(wx, wy, m * (num*90));
                    break;
                }

                case 'F': {
                    x += wx*num;
                    y += wy*num;
                    break;
                }
            }
        });

        return Math.abs(x) + Math.abs(y);
    };

    const input = document.body.innerText;

    const instructions = parseInstructions(input);

    console.log('Part 1:', part1(instructions));
    console.log('Part 2:', part2(instructions));
})();
