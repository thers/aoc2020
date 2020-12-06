// Day 3

(() => {
    const map = document.body.innerText.split('\n').filter(Boolean);

    const countTrees = (rs, ds) => map.filter((row, ri) => ri !== 0 && (ri%ds === 0) && row[((ri/ds) * rs) % row.length] === '#').length;
    
    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ];

    console.log('Answer:', slopes.reduce((acc, slope) => acc * countTrees(...slope), 1));
})();
