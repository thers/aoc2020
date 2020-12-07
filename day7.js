// Day 7

(() => {
    const matchAll = (input, regexp) => [...input.matchAll(regexp)].map(item => item.groups);

    const computeRules = (input) => matchAll(input.trim(), /(?<containerColor>.*?) bags contain (?<containerRules>.*?)\./g)
        .map(rule => [
            rule.containerColor,
            rule.containerRules = rule.containerRules === 'no other bags'
                ? {}
                : matchAll(rule.containerRules, /(?<quantity>[0-9]+) (?<color>.*?) bags?/g).reduce((acc, rule) => Object.assign(acc, { [rule.color]: (rule.quantity|0) }), {})
        ])
        .reduce((acc, [key, value]) => Object.assign(acc, { [key]: value }), {});

    const countColor = (rules, rule, color) => (rule[color]|0) + Object.entries(rule).reduce((acc, [innerColor, quantity]) => acc + quantity * countColor(rules, rules[innerColor], color), 0);
    const countInsides = (rules, rule) => Object.entries(rule).reduce((acc, [innerColor, quantity]) => acc + quantity + quantity * countInsides(rules, rules[innerColor]), 0);

    const rules = computeRules(document.body.innerText);



    console.log('Rules:', rules);
    console.log('Part 1:', Object.entries(rules).filter(([, rule]) => countColor(rules, rule, 'shiny gold')).length);
    console.log('Part 2:', countInsides(rules, rules['shiny gold']));
})();
