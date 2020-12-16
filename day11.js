// Day 11

(() => {
    const FLOOR = '.';
    const EMPTY = 'L';
    const OCCUPIED = '#';

    const adjacentLayout = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0],           [1, 0],
        [-1, 1],  [0, 1],  [1, 1],
    ];

    const seatsToString = (seats) => {
        return seats.map((row) => row.join('')+'\n').join('');
    };

    const getLayout = (input) => {
        const rows = input.trim().split('\n');

        const rowLength = rows[0].length;

        return {
            seats: rows.map(row => row.split('')),
            mx: rows[0].length,
            my: rows.length,
        };
    };

    const part1 = (layout) => {
        let { seats } = layout;
        const { mx, my } = layout;

        const countAdjacent = (x, y, state) => adjacentLayout
            .map(([dx, dy]) => [dx + x, dy + y])
            .filter(([nx, ny]) => nx>=0 && nx<mx && ny>=0 && ny<my)
            .map(([nx, ny]) => seats[ny][nx])
            .filter(seat => seat === state)
            .length;

        while (true) {
            let mutations = 0;

            const mutation = seats.map((row, y) => row.map((seat, x) => {
                let newState = seat;

                switch (seat) {
                    case EMPTY: {
                        newState = countAdjacent(x, y, OCCUPIED) === 0
                            ? OCCUPIED
                            : EMPTY;
                        break;
                    }
                    case OCCUPIED: {
                        newState = countAdjacent(x, y, OCCUPIED) >= 4
                            ? EMPTY
                            : OCCUPIED;
                        break;
                    }
                }

                if (newState !== seat) {
                    mutations++;
                }

                return newState;
            }));

            if (mutations === 0) {
                return seats.flat().filter(seat => seat === OCCUPIED).length;
            }

            seats = mutation;
        }
    };

    const part2 = (layout) => {
        let { seats } = layout;
        const { mx, my } = layout;

        const checkBoundaries = (x, y) => x>=0 && x<mx && y>=0 && y<my;

        const seekDir = (sx, sy, dx, dy) => {
            const nx = sx + dx;
            const ny = sy + dy;

            if (!checkBoundaries(nx, ny)) {
                return false;
            }

            const seatState = seats[ny][nx];

            if (seatState === OCCUPIED) {
                return true;
            }
            if (seatState === EMPTY) {
                return false;
            }

            return seekDir(nx, ny, dx, dy);
        };

        const countOccupied = (x, y) => adjacentLayout
            .filter(([dx, dy]) => seekDir(x, y, dx, dy))
            .length;

        while (true) {
            let mutations = 0;

            const mutation = seats.map((row, y) => row.map((seat, x) => {
                let newState = seat;

                switch (seat) {
                    case EMPTY: {
                        newState = countOccupied(x, y) === 0
                            ? OCCUPIED
                            : EMPTY;
                        break;
                    }
                    case OCCUPIED: {
                        newState = countOccupied(x, y) >= 5
                            ? EMPTY
                            : OCCUPIED;
                        break;
                    }
                }

                if (newState !== seat) {
                    mutations++;
                }

                return newState;
            }));

            if (mutations === 0) {
                return seats.flat().filter(seat => seat === OCCUPIED).length;
            }

            seats = mutation;
        }
    };

    const input = document.body.innerText;
    const layout = getLayout(input);

    console.log('Part 1:', part1(layout));
    console.log('Part 2:', part2(layout));
})();
