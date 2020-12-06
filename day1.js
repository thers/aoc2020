// Day 1

// Part 1
(() => {
    const n = document.body.innerText.split('\n').map(i=>parseInt(i));

    n.forEach(n1 => n.forEach(n2 => {
        if (n1 + n2 === 2020) {
            console.log('Match:', n1, n2, 'mult:', n1 * n2);
        }
    }));
})();

// Part 2
(() => {
    const n = document.body.innerText.split('\n').map(i=>parseInt(i));

    n.forEach(n1 => n.forEach(n2 => n.forEach(n3 => {
        if (n1 + n2 + n3 === 2020) {
            console.log('Match:', n1, n2, n3, 'mult:', n1 * n2 * n3);
        }
    })));
})();
