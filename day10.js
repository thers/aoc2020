// Day 10
// Failed to find any meaningful pattern in data or its permutations,
// failed to come up with recurse'n'cache approach, so thanks to reddit solution megathread for hinting the right direction.

(() => {
    const part1 = (adapters) => adapters.reduce((acc, joltage, i) => {
        const joltageDiff = joltage - (adapters[i-1]|0);

        acc[joltageDiff] = (acc[joltageDiff]|0) + 1;

        return acc;
    }, { [3]: 1 });

    // Okay, as expected, this will finish somewhere in 2077 from now on real data set, rip
    const part2 = (adapters) => {
        const path = [0, ...adapters, adapters[adapters.length - 1] + 3];

        const map = path.reduce((acc, x) => Object.assign(acc, { [x]: 1 }), {});
        const paths = new Map(path.map(x => [x, [x+1, x+2, x+3].filter(y => map[y])]));

        let stack = paths.get(0).slice();
        let acc = stack.length;

        while (stack.length) {
            const adapter = stack.pop();
            const adapterPaths = paths.get(adapter);

            acc += (adapterPaths.length || 1) - 1;

            stack.push(...adapterPaths);
        }

        return acc;
    };

    const part2dyn = (adapters) => {
        const path = [0, ...adapters, adapters[adapters.length - 1] + 3];

        const map = path.reduce((acc, x) => Object.assign(acc, { [x]: 1 }), {});
        const paths = new Map(path.map(x => [x, [x+1, x+2, x+3].filter(y => map[y])]));

        const cache = {};
        const subpath = (start) => {
            if (cache[start]) {
                return cache[start];
            }

            let cnt = 0;
            const subpaths = paths.get(start);

            if (subpaths.length === 0) {
                cnt = 1;
            } else {
                subpaths.forEach((next) => cnt += subpath(next));   
            }

            return cache[start] = cnt;
        };

        return paths.get(0).reduce((acc, x) => acc + subpath(x), 0);
    };
    
    const input = document.body.innerText;

    const adapters = input.trim().split('\n').map(x => parseInt(x)).sort((a, b) => a - b);
    
    const p1 = part1(adapters);
    const p2 = part2dyn(adapters);

    console.log('Part 1:', p1[1] * p1[3]);
    console.log('Part 2:', p2);
})();
