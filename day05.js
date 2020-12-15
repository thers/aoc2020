// Day 5

(() => {
    const fbm = { F: 0, B: 1 };
    const lrm = { L: 0, R: 1 };

    const decodeSeq = (v,m)=>v.split('').map(l=>m[l]).reverse().reduce((a,n,i) => a|(n<<i), 0);
    const decodeSeat = (v) => {
        const rowv = v.substr(0, 7);
        const colv = v.substr(7);

        const row = decodeSeq(rowv, fbm);
        const col = decodeSeq(colv, lrm);

        return row * 8 + col;
    };

    const seats = document.body.innerText.trim().split('\n').map(decodeSeat).sort((a,b) => a-b);

    let lastSeat = 0;
    seats.forEach((s, i) => {
        if (i === 0) {
            lastSeat = s;
            return;
        }

        if (s - lastSeat > 1) {
            console.log('Your seat is:', s - 1);
        }

        lastSeat = s;
    })

    console.log('Highest seat number:', seats[seats.length - 1]);
})();
