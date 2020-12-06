// Day 4

(() => {
    const hex = /^#[0-9a-f]{6}$/;
    const pid = /^[0-9]{9}$/;

    const fields = {
        byr(v) {
            const n = parseInt(v);

            return n >= 1920 && n <= 2002;
        },
        iyr(v) {
            const n = parseInt(v);

            return n >= 2010 && n <= 2020;
        },
        eyr(v) {
            const n = parseInt(v);

            return n >= 2020 && n <= 2030;
        },
        hgt(v) {
            const hgt = parseInt(v);

            const isIn = v.endsWith('in');
            const isCm = v.endsWith('cm');

            if (isCm) {
                return hgt >= 150 && hgt <= 193;
            } else if (isIn) {
                return hgt >= 59 && hgt <= 76;
            }

            return false;
        },
        hcl(v) {
            return hex.test(v);
        },
        ecl(v) {
            return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v);
        },
        pid(v) {
            return pid.test(v);
        }
    };

    const passports = document.body.innerText.trim().split('\n')
        .map(x=>x.split(' '))
        .flat()
        .reduce((acc, row) => {
            if (!row) {
                acc.push({});
                return acc;
            }

            acc[acc.length - 1][row.substr(0, 3)] = row.substr(4);
            return acc;
        }, [{}])
        .filter(passport => Object.keys(fields).every(key => key in passport))
        .filter(passport => Object.entries(fields).every(([key, validate]) => validate(passport[key])));

    console.log(passports);
})();
